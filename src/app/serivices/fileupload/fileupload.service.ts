import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.dev';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({providedIn:'root'})
export class FileuploadService {

  
  private baseUrl = environment.baseUrl;
  private http = inject( HttpClient );

  
  async actualizarFoto(
    archivo: File,
    tipo: 'usuarios'|'medicos'|'hospitales',
    id: string
  ) {

    try {

      const url = `${ this.baseUrl }/upload/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('tokenUser') || ''
        },
        body: formData
      });

      const data = await resp.json();

      if ( data.ok ) {
        console.log('ok', data.nombreArchivo);
        return data.nombreArchivo;
      } else {
        console.log(data.msg);
        return false;
      }
      
    } catch (error) {
      console.log('error', error);
      return false;    
    }

  }



  /*actualizarFotos(
    archivo: File,
    tipo: Tipo,
    id: string
  ){
    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('tokenUser') || ''
    });

    const formData = new FormData();
    formData.append('imagen', archivo);

    return this.http.put(`${this.baseUrl}/upload/${tipo}/${id}`, formData, { headers })
            
  }*/
}
