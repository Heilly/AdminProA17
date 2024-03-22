import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { UsuarioservService } from '../usuarioserv/usuarioserv.service';

@Injectable({ providedIn: 'root' })
export class ImgservService {

  private usuarioServ = inject(UsuarioservService);
  
  private http = inject( HttpClient );
  private baseUrl = environment.baseUrl;
  private imgUrl = this.usuarioServ.usuario()?.img;

  //cargar la imagen que esta en el server, 
  //en caso que no este ponerle una imagen por defecto
  public imgUserUrl = computed( () => {
          if(this.imgUrl?.includes('https')) return this.imgUrl;
          if(this.imgUrl) return `${ this.baseUrl }/upload/usuarios/${this.imgUrl}`;
          return `${ this.baseUrl }/upload/usuario/no-image`;} 
        )}
