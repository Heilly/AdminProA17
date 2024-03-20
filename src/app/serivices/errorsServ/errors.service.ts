import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ErrorsService {
  


  getErrors( field: string, form: FormGroup ) : boolean {

    if( form.get(field)?.errors && form.get(field)?.touched ) return true;
    return false;
  }

  showError( field: string, form: FormGroup ) {
    const errors = form.get(field)?.errors || {};
    
      for( let key of Object.keys(errors)){
        switch (key){
          case 'required':
            return `${field} requerido`;
          case 'email':
            return `Formato de ${field} invalido`;
          case 'minlength':
            return `Mínimo ${errors['minlength'].requiredLength } caracteres`
        }
      }
    return;
  }
}
