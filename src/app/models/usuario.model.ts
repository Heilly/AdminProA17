import { environment } from "../environments/environment.dev";

const base_url = environment.baseUrl;

export class UsuarioModel{

    constructor(
        public name:   string,
        public email:  string,
        public role?:   string,
        public google?: boolean,
        public uid?:    string,
        public img?: string,
        public password?: string,
    ){}

    get imagenUrl() {
        
        if ( this.img?.includes('https') ) {
            return this.img;
        }
        
        if ( this.img ) {
            const urlImagen = `${ base_url }/upload/usuarios/${ this.img }`;
            //console.log(urlImagen);
            return `${ base_url }/upload/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/upload/usuario/no-image`;
        }
    }
}