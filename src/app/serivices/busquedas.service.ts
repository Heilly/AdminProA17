import { inject, Injectable } from '@angular/core';
import { Tipo } from '../interfaces';
import { map, Observable } from 'rxjs';
import { UsuarioModel } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.dev';

@Injectable( { providedIn: 'root' } )
export class BusquedasService {

  private http = inject( HttpClient );
  private router = inject( Router );
  private baseUrl = environment.baseUrl;
  // constructor() {}

  get token(){
    return localStorage.getItem('tokenUser') || '';
  }
  get headers(){
    return{
      headers: {
        'x-token' : this.token
      }
    }
  }

  busquedaGlobal( termino: string ) {

    const url = `${ this.baseUrl }/todo/${ termino }`;
    return this.http.get( url, this.headers );

  }

  buscarTipo( tipo: Tipo, field: string ) : Observable<UsuarioModel[]> {
    return this.http.get( `${this.baseUrl}/todo/coleccion/${ tipo }/${ field }`, this.headers )
    .pipe(
      //delay(1000),
      map( (resp: any) => {
        const user = resp.resultados;
        const usuarios = user.map( 
          //creo nuevos usuario con la estuctura de UsuarioModel
          (user: UsuarioModel) => new UsuarioModel( user.name, user.email, user.role, user.google, user.uid, user.img, user.password )
         )
         console.log(usuarios);
         return usuarios;
      })
    )
  }
}
