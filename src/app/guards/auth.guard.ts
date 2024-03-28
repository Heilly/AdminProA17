import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { UsuarioservService } from '../serivices/usuarioserv.service';
import { tap } from 'rxjs';

/**
 * CanActivate se ejecuta antes de la navegación a la ruta, para determinar si se debe permitir el acceso.
  CanMatch se ejecuta después de la navegación, para decidir si la ruta coincide.
 */

export const authCanActivatedGuard: CanActivateFn = (route, state) => {
  //console.log('authCanActivatedGuard');
  const usuarioServ = inject( UsuarioservService );
  const router = inject( Router );

  return usuarioServ.validarToken()
          .pipe(
            tap( isAuth => {
              if( !isAuth) {
              router.navigateByUrl( '/login' );}
            } )
          )
};
