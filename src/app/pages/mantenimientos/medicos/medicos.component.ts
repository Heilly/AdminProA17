import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicosservService } from '../../../serivices/medicosserv.service';
import { MedicosModel } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { ImagenpipePipe } from '../../../shared/pipes/imagenpipe/imagenpipe.pipe';
import { ModalimagenservService } from '../../../serivices/modalimagenserv.service';
import { delay, Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  standalone: true,
  imports: [CommonModule, ImagenpipePipe, RouterLink],
})
export class MedicosComponent implements OnDestroy {

  private medicosServ = inject( MedicosservService );
  private modalImagenService = inject( ModalimagenservService );
  public cargando: boolean = true;

  private sub$ : Subscription;

  public medicosList : MedicosModel[] = [];
  public existe : boolean = true;

  constructor(){
    this.cargarMedicos();
    this.sub$ = this.modalImagenService.nuevaImagen
                    .pipe( delay(100) )
                    .subscribe(  data => this.cargarMedicos())
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }

  cargarMedicos(){
    this.cargando = true;
    this.medicosServ.cargarMedicos( )
    .subscribe(medicos => {
      
      this.medicosList = medicos;
      this.cargando= false;
    })
  }


  eliminarMedico( medico: MedicosModel ){

    if(!medico) return;
    Swal.fire({
      title: "¿Borrar usuario?",
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosServ.eliminarMedicos(medico._id)
        .subscribe( data => {
          Swal.fire({
          title: "Eliminado!",
          text: `${medico.nombre} ha sido eliminado.`,
          icon: "success"
        });
        this.cargarMedicos();
        } )
        
      }
    });
  } 

  async abrirSweetAlert(){
    const { value: text } = await Swal.fire({
      input: "text",
      
      inputLabel: "Nombre del Doctor",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here"
      },
      showCancelButton: true
    });
    if (text) {
      Swal.fire(text);
    }
  }

  abrirModal(medico : MedicosModel){
    if(medico._id){
      this.modalImagenService.abrirModal( 'medicos', medico._id, medico.img );
  }
}

buscarMedico(field: string){
  if(field !== ''){
    this.medicosServ.buscarMedicos( field )
        .subscribe( medicos => {
          console.log(medicos);
          if( medicos.length > 0 ){
          this.medicosList = medicos;
          this.existe = true;
        } else{
          this.existe = false;
          this.medicosList.length = 0;
        }
          
        } )}
}

  
}
