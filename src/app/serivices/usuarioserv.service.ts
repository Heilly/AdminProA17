import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { environment } from '../environments/environment.dev';
import { UserLogin } from '../interfaces/userLogin.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';
import { UserRenewGoogle, UsuarioDB, UserCreated, UserLoginGoogle, GetUsuario } from '../interfaces';
import { Tipo } from '../interfaces/tipo.type';
;

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
  get headers(){
    return{
      headers: {
        'x-token' : this.token
      }
    }
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
    return this.http.get<UserRenewGoogle>( `${this.baseUrl}/login/renew`, this.headers )
    .pipe(
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

    return this.http.put( `${this.baseUrl}/usuarios/${this.usuario.uid}`, body, this.headers)
      
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
                  tap( (resp) => {
                    console.log('loginGoogle',resp);
                    this.usuario = new UsuarioModel( resp.name, resp.email, 'USER_ROLE', true, '', resp.picture )
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

  cargarUsuarios( desde: number = 0 ) {
    return this.http.get<GetUsuario>(` ${ this.baseUrl }/usuarios?desde=${ desde } `, this.headers)
      .pipe(
        //delay(1000),
        map( resp => {
          console.log(resp.usuarios);
          const usuarios = resp.usuarios.map( 
            //creo nuevos usuario con la estuctura de UsuarioModel
            user => new UsuarioModel( user.name, user.email, user.role, user.google, user.uid, user.img, user.password )
           )
           
           return {
            total: resp.total,
            usuarios: usuarios
           }
        })
      )
  }

  buscarUsuario( tipo: Tipo, field: string ) : Observable<UsuarioModel[]> {
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
  eliminarUsuario( usuario: UsuarioModel){
    const idUsuario = usuario.uid
    return this.http.delete(`${this.baseUrl}/usuarios/${idUsuario}`, this.headers)
  }

  guardarUsuario(usuario: UsuarioModel){

    return this.http.put( `${this.baseUrl}/usuarios/${usuario.uid}`, usuario, this.headers)
                .pipe(
                  tap(data => console.log(data))
                )
  }

}
