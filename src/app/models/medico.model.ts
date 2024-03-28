import { Hospital } from "./hospital.model";

 interface _Usuario {
    _id: string,
    name: string,
    img: string,
 }


export class MedicosModel {

    constructor(
        public _id: string,
        public nombre: string,
        public hospital: Hospital,
        public usuario?: _Usuario,
        public img?: string
        ) {
        
    }
}