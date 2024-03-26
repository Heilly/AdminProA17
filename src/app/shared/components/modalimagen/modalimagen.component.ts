import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalimagenservService } from '../../../serivices/modalimagenserv/modalimagenserv.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { FileuploadService } from '../../../serivices/fileupload/fileupload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'shared-modalimagen',
  templateUrl: './modalimagen.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ModalimagenComponent {

public modalImagenService = inject( ModalimagenservService );
public fileUploadService = inject( FileuploadService );

public imagenSubir?: File;
public imgTemp: any = null;

public usuario?: UsuarioModel;
constructor (){
  console.log(this.imgTemp);
  }


cerrarModal(){
  this.modalImagenService.cerrarModal();
}


cambiarImagen( target: any ) {
  
  const file : File = target.files[0];
  console.log(file);
  this.imagenSubir = file;

  if ( !file ) { 
    return this.imgTemp = null;
  }

  const reader = new FileReader();
  reader.readAsDataURL( file );

  reader.onloadend = () => {
    this.imgTemp = reader.result;
  }
  return;

}
subirImagen() {

  const id   = this.modalImagenService.id;
  const tipo = this.modalImagenService.tipo;

  
 if( !this.imagenSubir ) return;
  this.fileUploadService
    .actualizarFoto( this.imagenSubir, tipo, id )
        .then( img => {
          Swal.fire('Guardado', 'Imagen de usuario actualizada', 'success');

          this.modalImagenService.nuevaImagen.emit(img);

          this.cerrarModal();
        }).catch( err => {
          console.log(err);
          Swal.fire('Error', 'No se pudo subir la imagen', 'error');
        })

}

  
}
