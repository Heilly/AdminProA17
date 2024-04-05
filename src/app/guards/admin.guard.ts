
import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { UsuarioservService } from '../serivices/usuarioserv.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const usuarioSer = inject(UsuarioservService);
  const router = inject( Router );
  console.log('CanActivate');

  if( usuarioSer.role === 'ADMIN_ROLE' ){
    return true;
  } else {
    router.navigateByUrl('/dashboard')
    return false;
  }

};

export const adminGuardMatch: CanMatchFn = () => {
  const usuarioSer = inject(UsuarioservService);
  const router = inject( Router );
  console.log('canMatch');
  if( usuarioSer.role === 'ADMIN_ROLE' ){
    return true;
  } else {
    router.navigateByUrl('/dashboard')
    return false;
  }
}
