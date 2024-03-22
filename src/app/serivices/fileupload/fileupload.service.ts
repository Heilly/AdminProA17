import { computed, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { Tipo } from '../../interfaces/tipo.type';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {  ImgUploadI } from '../../interfaces/file.interface';
import { map, tap } from 'rxjs';
import { UsuarioDB } from '../../interfaces/UsuarioDB.inetrface';
import { UsuarioservService } from '../usuarioserv/usuarioserv.service';

@Injectable({providedIn:'root'})
export class FileuploadService {

  private usuarioServ = inject( UsuarioservService );
  
  private baseUrl = environment.baseUrl;
  private http = inject( HttpClient );

  

  /*async actualizarFoto(
    archivo: File,
    tipo: 'hospitales' | 'medicos' | 'usuarios',
    id: string
  ){

      try {
        const url = `${this.baseUrl}/upload/${tipo}/${id}`;
        const formData = new FormData();
        formData.append('imagen', archivo);

        const resp = await fetch( url, {
          method: 'PUT',
          headers: {
            'x-token': localStorage.getItem('tokenUser') || ''
          },
          body: formData
        });
        console.log(resp);
        return;

      } catch (error) {
        console.log(error);
        return false;
      }
  }*/

  actualizarFotos(
    archivo: File,
    tipo: Tipo,
    id: string
  ){
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('tokenUser') || ''
    });

    const formData = new FormData();
    formData.append('imagen', archivo);

    return this.http.put<ImgUploadI>(`${this.baseUrl}/upload/${tipo}/${id}`, formData, { headers })
              .pipe(
                map(data => data.nombreArchivo),
                tap( data =>{

                  
                  this.usuarioServ.usuario.update( currentUser => {
                    if(currentUser){
                      currentUser.img = data;
                      return currentUser;
                    } else {
                      return undefined;
                    }
                  } );
                  console.log(this.usuarioServ.usuario);
                }
                )
    );
            
  }
}
