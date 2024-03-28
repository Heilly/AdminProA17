import { EventEmitter, Injectable } from '@angular/core';
import { Tipo } from '../interfaces/tipo.type';
import { environment } from '../environments/environment.dev';

@Injectable({ providedIn: 'root'})
export class ModalimagenservService {
  // constructor() {}
  
  private baseUrl = environment.baseUrl;

  private _ocultarModal: boolean = true;
  public tipo: Tipo = 'usuarios';
  public id: string = '';
  public img: string = 'no-img';

  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  
  get Modal(){
    return this._ocultarModal;
  }

  abrirModal( 
    tipo: Tipo,
    id: string,
    img: string = 'no-img'
  ) {
    
      this._ocultarModal = false;
      this.tipo = tipo;
      this.id = id;
        if ( img.includes('https') ) {
          this.img = img;
        } else {
          this.img = `${ this.baseUrl }/upload/${ tipo }/${ img }`;
        }
    }

  cerrarModal(){
    this._ocultarModal = true  ;
  }


}
