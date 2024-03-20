import { AfterViewInit, Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorsService } from '../../serivices/errorsServ/errors.service';
import { UsuarioservService } from '../../serivices/usuarioserv/usuarioserv.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements AfterViewInit {

  private fb = inject( FormBuilder );
  private errorsServ = inject( ErrorsService );
  private usuarioServ = inject( UsuarioservService );
  private router = inject( Router );

  public formLogin : FormGroup;

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  constructor(){
      this.formLogin = this.fb.group({
      email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
      password: ['', Validators.required ],
      remember: [false]
    });
  }
  
  ngAfterViewInit(): void {
    this.googleInit()
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
    console.log("Encoded JWT ID token: " + response.credential);
    
    this.usuarioServ.loginGoogle( response.credential )
        .subscribe( () => {
          
          this.router.navigateByUrl('/dashboard')})
  }

  onSubmit(){
    
    if( this.formLogin.invalid ){
      this.formLogin.markAllAsTouched();
    } else{
      console.log(this.formLogin.value);
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
