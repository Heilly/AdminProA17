import { Pipe, PipeTransform } from '@angular/core';
import { UsuarioModel } from '../../../models/usuario.model';

@Pipe({ name: 'imagenurluserPipe', standalone: true })

export class ImagenurluserPipe implements PipeTransform {
  
  public transform( usuario: UsuarioModel ): string {
    if( usuario ){
      console.log(usuario.imagenUrl);
      return usuario.imagenUrl;
    }
    return '';
  }
}
