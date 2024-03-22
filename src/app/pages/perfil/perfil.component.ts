import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioservService } from '../../serivices/usuarioserv/usuarioserv.service';
import { ImgservService } from '../../serivices/imgserv/imgserv.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileuploadService } from '../../serivices/fileupload/fileupload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PerfilComponent {

  private usuarioServ = inject( UsuarioservService );
  private imgServ = inject( ImgservService );
  private fileServ = inject( FileuploadService );
  private fb = inject( FormBuilder );

  public usuario = this.usuarioServ.usuario();
  public imgUsuario = this.imgServ.imgUserUrl();
  public imagenSubir?: File;
  
  public formProfile : FormGroup;

  constructor (){
    this.formProfile = this.fb.group({
      name: [ this.usuario?.name || '', Validators.required],
      email: [ this.usuario?.email || '', [Validators.required, Validators.email] ]
    });
  }



  onSubmit(){
    //console.log(this.formProfile.value);

    this.usuarioServ.actualizarUsuario(this.formProfile.value)
        .subscribe();
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

  guardarImage(){
    if(this.imagenSubir && this.usuario?.uid ){
      this.fileServ.actualizarFotos( this.imagenSubir, 'usuarios', this.usuario?.uid )
          .subscribe( data => {
            console.log( '2', data);
            console.log(  '3', this.usuario)} )
    }
    
  }



}
