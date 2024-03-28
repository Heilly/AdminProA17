import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HospitalesservService } from '../../../serivices/hospitalesserv.service';
import { Hospital } from '../../../models/hospital.model';
import { ImagenpipePipe } from '../../../shared/pipes/imagenpipe/imagenpipe.pipe';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { ModalimagenservService } from '../../../serivices/modalimagenserv.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  standalone: true,
  imports: [CommonModule, ImagenpipePipe, FormsModule],
})
export class HospitalesComponent implements OnInit, OnDestroy  {

  private hospitalServ = inject(HospitalesservService);
  public modalImagenService = inject( ModalimagenservService );
  public imgSub$? : Subscription;

  public hospitalesList: Hospital[] = [];
  public cargando: boolean = true;
  public existe: boolean = true;



  constructor(){
    this.cargarHospitales();
  }
  ngOnDestroy(): void {
    this.imgSub$?.unsubscribe();
  }
  ngOnInit(): void {
    this.imgSub$ = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => {
        this.cargarHospitales();
      })
  }

  cargarHospitales(){

    this.cargando = true;

    this.hospitalServ.cargarHospitales()
        .subscribe( hospitales => { 
          this.cargando = false;
          this.hospitalesList = hospitales;
        })
  }

  guardarCambios( hospital : Hospital ){
    if(hospital._id){
      this.hospitalServ.actualizarHospitales( hospital.nombre, hospital._id)
          .subscribe(resp => {
            console.log(resp);
            Swal.fire( 'Actualizado', hospital.nombre, 'success' );
          })
      }
  }

  eliminarHospital( hospital : Hospital  ){
    if(hospital._id){
      this.hospitalServ.eliminarHospitales( hospital._id)
          .subscribe(resp => {
            this.cargarHospitales();
            Swal.fire( 'Eliminado', hospital.nombre, 'success' );
          })
      }
  }

  async abrirSweetAlert(){
    const { value = '' } = await Swal.fire<string>({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      this.hospitalServ.crearHospitales( value )
        .subscribe( (resp: any) => {
          this.hospitalesList.push( resp.hospital )
        })
    }
  }
  abrirModal(hospital: Hospital) {
    if(hospital._id){
    this.modalImagenService.abrirModal( 'hospitales', hospital._id, hospital.img );
    }
  }

  buscarHospital( field: string ) {
    if(field !== ''){
    this.hospitalServ.buscarHospitales( field )
        .subscribe( hospitales => {
          if( hospitales.length > 0 ){
          this.hospitalesList = hospitales;
          this.existe = true;
        } else{
          this.existe = false;
          this.hospitalesList.length = 0;
        }
          
        } )}
        //this.cargarHospitales();
  }

}
