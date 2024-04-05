import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicosservService } from '../../../serivices/medicosserv.service';
import { HospitalesservService } from '../../../serivices/hospitalesserv.service';
import { MedicosModel } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ImagenpipePipe } from '../../../shared/pipes/imagenpipe/imagenpipe.pipe';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImagenpipePipe],
})
export class MedicoComponent implements OnInit, OnDestroy {

private router = inject( Router );
private route = inject( ActivatedRoute );
private medicoServ = inject( MedicosservService );
public hospitalesServ = inject( HospitalesservService );
public fb = inject( FormBuilder );



public sub$: Subscription;

public idUsuario : string = '';
public currentMedico? : MedicosModel;
public hospitalesList : Hospital[] = [];


public hospitalSeleccionado?: Hospital;
public medicoNuevo: boolean = true;

public medicoForm : FormGroup;

constructor(){
  this.sub$ = this.route.params
      .subscribe(data => {
        this.buscarMedicoById(data['id'])
      });
  console.log('id Usuario', this.currentMedico?._id);

  this.cargarHospitales()

  this.medicoForm = this.fb.group({
    nombre: [ '', Validators.required ],
    hospital: [ '', Validators.required ]
  })
  
}
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  
  ngOnInit(): void {
    this.medicoForm.get('hospital')?.valueChanges
            .subscribe(hospitalId => {
              
              this.hospitalSeleccionado = this.hospitalesList.find( h => h._id === hospitalId );
              console.log('changeValue',this.hospitalSeleccionado)
            }
            )
      }

  cargarHospitales(){
    this.hospitalesServ.cargarHospitales().subscribe( hospital =>{ 
      this.hospitalesList = hospital;

          console.log(this.hospitalesList);
    })
  }

guardarMedico(){

  const { nombre, hospital } = this.medicoForm.value;

  if( !this.currentMedico ){
    this.medicoNuevo = true;

    Swal.fire({
      title: "¿ Quiere crear un nuevo medico ?",
      text: `Nombre: ${nombre}, en el Hospital: ${hospital}`,
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, guardar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicoServ.crearMedico( nombre, hospital )
          .subscribe( data =>{
            this.router.navigateByUrl('/dashboard/medicos');
            console.log('Se creo con exito') } )
        Swal.fire({
          title: "Guardado",
          icon: "success"
        });
      }
    });
    return;
  } else {

  this.medicoNuevo = false;

  Swal.fire({
    title: "¿ Quiere actualizar?",
    text: `Nombre: ${nombre}, en el Hospital: ${hospital}`,
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, actualizar"
  }).then((result) => {
    if (result.isConfirmed) {
      this.medicoServ.actualizarMedicos( this.currentMedico!._id, nombre, hospital )
        .subscribe( data =>{
          this.router.navigateByUrl('/dashboard/medicos');
          console.log('Se actualizo con exito') } )
      Swal.fire({
        title: "Actualizado",
        icon: "success"
      });
    }
  });

  this.medicoServ.actualizarMedicos( this.currentMedico._id, nombre, hospital )
        .subscribe( data => console.log('se actualizó') )

  }

}

buscarMedicoById(id : string){

  if( id === 'nuevo'){
    this.medicoNuevo = true;
      return;
    }
    this.medicoNuevo = false;
  this.medicoServ.buscarMedicoById( id )
      .pipe( delay(500))
      .subscribe( medico => {
        if ( !medico ) {
          this.router.navigateByUrl(`/dashboard/medicos`);
          return;
        }
        /** 
         * this.medicoForm.get('nombre')?.setValue(medico.nombre);
         * this.medicoForm.get('hospital')?.setValue(medico.hospital._id);
         * 
        */
        
        const { nombre, hospital:{ _id } } = medico; 
        this.currentMedico = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
        

      } )
}


}
