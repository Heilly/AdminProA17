import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder,  FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ErrorsService } from '../../serivices/errors.service';
import { UsuarioservService } from '../../serivices/usuarioserv.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: '../login/login.component.css'
})
export class RegisterComponent {

  private fb = inject(FormBuilder);
  private errorService = inject(ErrorsService);
  private usuarioServ = inject( UsuarioservService );
  private router = inject(Router );

  public formSubmitted : boolean = false;

  public registerForm = this.fb.group({
    name: [ '', [ Validators.required ]],   
    email:  [ '', [ Validators.required, Validators.email ] ],
    password:  [ '', [ Validators.required, Validators.minLength(6) ] ],
    password2:  [ '', [ Validators.required, Validators.minLength(6) ] ],
    terminos:  [ false, [ Validators.requiredTrue ] ]
  }, {
    validators: this.passwordsIguales( 'password', 'password2' )
  });




  onSubmit(){
    this.formSubmitted = true;  
  //console.log(this.registerForm);
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      console.log('Formulario no es correcto');
      
    }else{
      console.log('Posteando formulario ...');
      //envio el formulario con sus valores
      this.usuarioServ.crearUsuario(this.registerForm.value)
          .subscribe( 
              //data => console.log(data),
              () => this.router.navigateByUrl('/dashboard'),
              (error) => {
                //console.warn(error.error.msg);
                //si sucede el error
                Swal.fire({
                  title: 'Error',
                  text: error.error.msg,
                  icon: 'error'
                })
              },
              );
    }
  }

  getErrors( field: string, ) : boolean {
    return this.errorService.getErrors( field, this.registerForm );
  }

  showError( field: string ) {
    return this.errorService.showError( field, this.registerForm );
  }

  passwordInValid(){
    //if( !this.registerForm.get('password2')) return true;
    
    if(this.registerForm.get('password2')?.errors && this.registerForm.get('password2')?.touched){
      const pass1 = this.registerForm.get('password')?.value;
      const pass2 = this.registerForm.get('password2')?.value;

      if( pass1 !== pass2 ) return true;}

    return false;
  }
  passwordsIguales(pass1: string, pass2: string){
    //hace una referencia abstracta al formulario que estamos trabajando
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      
      //Añadirle errores de validacion a los campos del formulario
      if( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noSonIguales: true })
      }
    }
  }

}
