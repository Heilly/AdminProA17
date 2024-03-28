import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MedicosservService } from '../../../serivices/medicosserv.service';
import { HospitalesservService } from '../../../serivices/hospitalesserv.service';
import { MedicosModel } from '../../../models/medico.model';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
public medicoSeleccionado: boolean = false;
public hospitalSeleccionado: boolean = false;
public medicoNuevo: boolean = true;
public hospitalesList : Hospital[] = [];

public medicoForm : FormGroup;

constructor(){
  this.sub$ = this.route.params
      .subscribe(data => {
        this.idUsuario = data['id'];
      });
  console.log('id Usuario', this.idUsuario);

  

  this.medicoForm = this.fb.group({
    nombre: [ '' ],
    hospital: [ '' ]
  })
  
}
  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
  
  ngOnInit(): void {

    if( this.idUsuario !== 'nuevo'){
        this.medicoNuevo = false;
      this.buscarMedicoById(this.idUsuario);}
      }

  cargarHospitales(){
    this.hospitalesServ.cargarHospitales().subscribe( hospital =>{ 
      this.hospitalesList = hospital;

          console.log(this.hospitalesList);
    })
  }

guardarMedico(){
  const nombre = this.medicoForm.get('nombre')?.value;
  const hospital = this.medicoForm.get('hospital')?.value;

  if( this.idUsuario === 'nuevo' ){
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
  }

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
      this.medicoServ.actualizarMedicos( this.idUsuario, nombre, hospital )
        .subscribe( data =>{
          this.router.navigateByUrl('/dashboard/medicos');
          console.log('Se actualizo con exito') } )
      Swal.fire({
        title: "Actualizado",
        icon: "success"
      });
    }
  });

  this.medicoServ.actualizarMedicos( this.idUsuario, nombre, hospital )
        .subscribe( data => console.log('se actualizó') )

}

buscarMedicoById(id : string){
  this.medicoServ.buscarMedicoById( id )
      .subscribe( medico => {
        
        this.currentMedico = medico;
        this.medicoForm.get('nombre')?.setValue(this.currentMedico.nombre);
        this.medicoForm.get('hospital')?.setValue(this.currentMedico.hospital._id);
        console.log('id Hospital',this.medicoForm.get('hospital')?.value);

      } )
}


}
