import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment.dev';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HospitalesservService {

  private http = inject( HttpClient );
  private router = inject( Router );
  private baseUrl = environment.baseUrl;

  get token(){
    return localStorage.getItem('tokenUser') || '';
  }
  get headers(){
    return{
      headers: {
        'x-token' : this.token
      }
    }
  }
  // constructor() {}


  cargarHospitales() {
    return this.http.get<Hospital[]>(` ${ this.baseUrl }/hospitales`, this.headers)
                .pipe(
                  map( (resp : any) => resp.hospitales )
                )
  }

  crearHospitales( nombre : string ) {
    return this.http.post<Hospital>(` ${ this.baseUrl }/hospitales`, { nombre }, this.headers )
  }  


  actualizarHospitales(nombre : string, _id: string ) {
    return this.http.put<Hospital[]>(` ${ this.baseUrl }/hospitales/${_id}`, { nombre }, this.headers)
  }  


  eliminarHospitales( _id: string ) {
    return this.http.delete<Hospital[]>(` ${ this.baseUrl }/hospitales/${_id}`, this.headers)
  }

  buscarHospitales( field: string  ) {
    return this.http.get(` ${ this.baseUrl }/todo/coleccion/hospitales/${field}`, this.headers)
                .pipe(
                  map( (resp : any ) => resp.resultados as Hospital[] )
                )
  }


}
