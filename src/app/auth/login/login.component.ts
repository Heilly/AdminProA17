import { AfterViewInit, Component, ElementRef, inject, ViewChild, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorsService } from '../../serivices/errors.service';
import { UsuarioservService } from '../../serivices/usuarioserv.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../../shared/header/header.component';
import { tap } from 'rxjs';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements AfterViewInit {

  private fb = inject( FormBuilder );
  private errorsServ = inject( ErrorsService );
  private usuarioServ = inject( UsuarioservService );
  private router = inject( Router );
  private ngZone = inject( NgZone );

  public formLogin : FormGroup;
  public formSelectUser : FormControl = new FormControl('null');

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  constructor(){
      this.formLogin = this.fb.group({
      email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
      password: ['', Validators.required ],
      remember: [false]
    });

    this.onChangeSelectUser()

  }

  onChangeSelectUser(){

    this.formSelectUser.valueChanges
                        .pipe(
                          tap( value => {
                            if( value === 'null' ){
                              this.formLogin.get('email')?.setValue('')
                              this.formLogin.get('password')?.setValue('')
                            } else if( value === 'user' ){
                              this.formLogin.get('email')?.setValue('user.login@adminpro.com')
                              this.formLogin.get('password')?.setValue('123456')
                            } else if( value === 'admin' ){
                              this.formLogin.get('email')?.setValue('admin.login@adminpro.com')
                              this.formLogin.get('password')?.setValue('123456')
                            }
                          } )
                        )
                        .subscribe()


  }




  /**
   * Cuando el usuario da click en el btnGoogle,
   * googleInit() se envia la informacion de mi id al serve de google, junto con la solicitud del usuario de hacer el login
   *  Google envia como respuesta las credenciales en forma de token
   * Este token lo enviamos al backend this.usuarioServ.loginGoogle( response.credential )
   * El backend recibe el token const googleSignIn = async( req, res = response ) donde la request es el token
   * googleVerify( req.body.token ) verifica que el token sea correcto y devolviendo el payload, en este punto podemos obtener los datos del user logueado 
   */
  
  ngAfterViewInit(): void {
    //this.googleInit()
  }
  googleInit() {
    google.accounts.id.initialize({
      client_id: '948583715514-rpkim7dc9btffe4hjj3r7ru6730mg5v9.apps.googleusercontent.com',
      callback: (response:any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }
  handleCredentialResponse(response: any) {
    //console.log(response);
    //console.log("Encoded JWT ID token: " + response.credential);
    
    this.usuarioServ.loginGoogle( response.credential )
        .subscribe( () => {
          this.ngZone.run(() => this.router.navigateByUrl('/dashboard' )
          )})
  }

  onSubmit(){
    
    if( this.formLogin.invalid ){
      this.formLogin.markAllAsTouched();
    } else{
      //console.log(this.formLogin.value);
      this.usuarioServ.loginUsuario( this.formLogin.value )
        .subscribe(resp => {
          if( this.formLogin.get('remember')?.value ){
            localStorage.setItem('email', this.formLogin.get('email')?.value );
          }
          localStorage.removeItem('email');

        },
        (error) => {
          //console.warn(error.error.msg);
          //si sucede el error
          Swal.fire({
            title: 'Error',
            text: error.error.msg,
            icon: 'error'
          })},
          () => this.router.navigateByUrl('/dashboard')   )
    }
  }

  getErrors( field : string ){
    return this.errorsServ.getErrors( field, this.formLogin );
  }
  showErrors( field : string ){
    return this.errorsServ.showError( field, this.formLogin );
  }




}
