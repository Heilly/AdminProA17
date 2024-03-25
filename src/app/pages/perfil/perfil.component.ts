import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioservService } from '../../serivices/usuarioserv/usuarioserv.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileuploadService } from '../../serivices/fileupload/fileupload.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';
import { catchError, tap } from 'rxjs';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PerfilComponent implements OnInit {

  private usuarioServ = inject( UsuarioservService );
  private fileServ = inject( FileuploadService );
  private fb = inject( FormBuilder );

  public usuario: UsuarioModel;
  public imagenSubir?: File;
  
  public formProfile! : FormGroup;

  constructor (){
    this.usuario = this.usuarioServ.usuario;

  }
  ngOnInit(): void {

    this.formProfile = this.fb.group({
      name: [ this.usuario.name , Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
    });

  }



  onSubmit(){
    //console.log(this.formProfile.value);

    this.usuarioServ.actualizarPerfil(this.formProfile.value)
    .subscribe( () => {
      const { name, email } = this.formProfile.value;
      this.usuario.name = name;
      this.usuario.email = email;

      Swal.fire('Guardado', 'Cambios fueron guardados', 'success');
    }, (err) => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }

  cambiarImagen(target: any){
    const img = target.files[0];
    console.log(img);
    if( !img.type.includes('image') ){
      alert('El archivo no es una imagen');
      this.imagenSubir= undefined;
    } else {
      this.imagenSubir = img;
    }
  }

  subirImagen(){
    if(this.usuario.uid ){
    this.fileServ
      .actualizarFoto( this.imagenSubir!, 'usuarios', this.usuario.uid )
      .then( img => {
        this.usuario.img = img;
        Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');
      }).catch( err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error');
      })

    }}
    
}




