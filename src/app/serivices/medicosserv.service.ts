import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.dev';
import { MedicosModel } from '../models/medico.model';
import { map } from 'rxjs';

@Injectable( { providedIn: 'root' } )
export class MedicosservService {
  
  
  private http = inject( HttpClient );
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


  cargarMedicos() {
    return this.http.get(` ${ this.baseUrl }/medicos`, this.headers)
                .pipe(
                  map( (resp : any) => resp.medicos as MedicosModel[] )
                )
  }

  crearMedico( nombre : string, hospital: string ) {

    const body = {
      nombre: nombre,
      hospital: hospital
    }
    return this.http.post<MedicosModel>(` ${ this.baseUrl }/medicos`, body, this.headers )
  }  


  actualizarMedicos( _id: string, nombre : string, hospital: string  ) {

    const body = {
      nombre: nombre,
      hospital: hospital
    }
    return this.http.put<MedicosModel[]>(` ${ this.baseUrl }/medicos/${_id}`, body, this.headers)
  }  


  eliminarMedicos( _id: string ) {
    return this.http.delete<MedicosModel[]>(` ${ this.baseUrl }/medicos/${_id}`, this.headers)
  }

  buscarMedicos( field: string  ) {
    return this.http.get(` ${ this.baseUrl }/todo/coleccion/medicos/${field}`, this.headers)
                .pipe(
                  map( (resp : any ) => resp.resultados as MedicosModel[] )
                )
  }
  buscarMedicoById( id: string ){
    return this.http.get<MedicosModel>(` ${ this.baseUrl }/medicos/${id}`, this.headers )
                .pipe(
                  map( (resp : any ) => resp.medico as MedicosModel )
                )
  }


}
