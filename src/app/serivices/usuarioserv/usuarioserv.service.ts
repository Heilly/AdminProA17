import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { UserRegister } from '../../interfaces/userRegister.interface';
import { UserLogin } from '../../interfaces/userLogin.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

@Injectable( { providedIn: 'root' } )
export class UsuarioservService {

  private http = inject( HttpClient );
  private router = inject( Router );
  private baseUrl = environment.baseUrl;

  /**
   * Encabezados (headers): Autenticación: para enviar tokens de autenticación (como JWT) para identificar y autorizar a los usuarios.
   * Cuerpo (body): Datos de entrada: al crear o actualizar un recurso, generalmente los incluirás en el cuerpo de la solicitud.
   *  Payload de la solicitud: Para solicitudes POST, PUT y PATCH, el cuerpo a menudo contendrá los datos que se están enviando al servidor para ser procesados.
      Envío de archivos y formularios
   */
  validarToken() : Observable<boolean>{
    const token = localStorage.getItem('tokenUser') || '';
    return this.http.get( `${this.baseUrl}/login/renew`, {
      headers: {
        'x-token': token
      }
    } ).pipe(
      tap( (resp: any) => localStorage.setItem('tokenUser', resp.token)  ),
      map( (resp) => true),
      catchError( () => of(false))
    );

  }

  crearUsuario( registerForm : UserRegister){

    const body = {
      name: registerForm.name,
      password: registerForm.password,
      email: registerForm.email
  }
    //puedo enviar los valores del formulario y que el backend seleccione los valores que necesitan
    //this.registerForm.value  return this.http.post( `${ this.baseUrl }/usuarios`, registerForm )
    //o puedo enviar los datos creando una variable body, esto es util para cuando tenemos campos con nombres diferentes 
    return this.http.post( `${ this.baseUrl }/usuarios`, body )
                .pipe(
                  tap( (resp: any) => localStorage.setItem('tokenUser', resp.token) )
                );
  }

  loginUsuario( formLogin: UserLogin){
    const body = {
      password: formLogin.password,
      email: formLogin.email
    }
    
    return this.http.post( `${ this.baseUrl }/login`, body )
              .pipe(
                tap( (resp: any) => localStorage.setItem('tokenUser', resp.token) )
              );
  }

  loginGoogle( token: string ){
    return this.http.post(`${this.baseUrl}/login/google`, {token})
                .pipe(
                  tap( (resp : any) => {
                    //console.log(resp);
                    localStorage.setItem('tokenUser', resp.token);
                    localStorage.setItem('email', resp.email);
                  } )
                )
  }

  

  logout(){

    const userEmail = localStorage.getItem('email');
      localStorage.removeItem('tokenUser');
      localStorage.removeItem('email');


    google.accounts.id.revoke(userEmail, () => {
      this.router.navigateByUrl('/login');
    })

  }
}
