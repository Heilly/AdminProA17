import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { map, tap } from 'rxjs';
import { UsuarioservService } from '../serivices/usuarioserv.service';

export const loginGuard: CanActivateFn = (route, state) => {

  const usuarioServ = inject( UsuarioservService );
  const router = inject( Router );

  return usuarioServ.validarToken()
          .pipe(
            map( (isAuth) => {
              console.log('loginGuard', isAuth);

              if( isAuth) {
              router.navigateByUrl( '/dashboard' );
              return false;
            }  return true;
            } ) );
};
