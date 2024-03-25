import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { UserLogin } from '../../interfaces/userLogin.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UserRenewGoogle} from '../../interfaces/UserRenewGoogle.interface';
import { UsuarioDB } from '../../interfaces/UsuarioDB.inetrface';
import { UserCreated } from '../../interfaces/userCreated.interface';
import { UserLoginGoogle } from '../../interfaces/userLoginGoogle.interface';
import { UsuarioModel } from '../../models/usuario.model';

declare const google: any;

@Injectable( { providedIn: 'root' } )
export class UsuarioservService {

  private http = inject( HttpClient );
  private router = inject( Router );
  private baseUrl = environment.baseUrl;

  //public usuario = signal<UsuarioDB | undefined>( undefined );
  public usuario : UsuarioModel;


  get token(){
    return localStorage.getItem('tokenUser') || '';
  }
  get uid():string {
    return this.usuario.uid || '';
  }

  
  constructor(){
    this.usuario = new UsuarioModel('', '');
  }

  

  /**
   * Encabezados (headers): Autenticación: para enviar tokens de autenticación (como JWT) para identificar y autorizar a los usuarios.
   * Cuerpo (body): Datos de entrada: al crear o actualizar un recurso, generalmente los incluirás en el cuerpo de la solicitud.
   *  Payload de la solicitud: Para solicitudes POST, PUT y PATCH, el cuerpo a menudo contendrá los datos que se están enviando al servidor para ser procesados.
      Envío de archivos y formularios
   */
  validarToken() : Observable<boolean>{
    return this.http.get<UserRenewGoogle>( `${this.baseUrl}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    } ).pipe(
      tap( (resp) =>{
        const {name, email, role, google, uid, img=''} = resp.usuarioDB;
        this.usuario = new UsuarioModel(name, email, role, google, uid, img);
        localStorage.setItem('tokenUser', resp.token);
      return true  }),
      map( () => true),
      catchError( () => of(false))
    );

  }

  crearUsuario( registerForm : UsuarioDB){

    const body = {
      name: registerForm.name,
      password: registerForm.password,
      email: registerForm.email
  }
    //puedo enviar los valores del formulario y que el backend seleccione los valores que necesitan
    //this.registerForm.value  return this.http.post( `${ this.baseUrl }/usuarios`, registerForm )
    //o puedo enviar los datos creando una variable body, esto es util para cuando tenemos campos con nombres diferentes 
    return this.http.post<UserCreated>( `${ this.baseUrl }/usuarios`, body )
                .pipe(
                  tap( (resp) => localStorage.setItem('tokenUser', resp.token) )
                );
  }
  actualizarPerfil( data : UsuarioModel){

    const body = {
      name: data.name,
      email: data.email
    }

    return this.http.put( `${this.baseUrl}/usuarios/${this.usuario.uid}`, body, {
      headers: {
        'x-token' : this.token
      } } )
      
  }

  loginUsuario( formLogin: UserLogin){
    const body = {
      password: formLogin.password,
      email: formLogin.email
    }
    
    return this.http.post<UserCreated>( `${ this.baseUrl }/login`, body )
              .pipe(
                tap( (resp) => localStorage.setItem('tokenUser', resp.token) )
              );
  }

  loginGoogle( token: string ){
    return this.http.post<UserLoginGoogle>(`${this.baseUrl}/login/google`, {token})
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
