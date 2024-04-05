import { environment } from "../environments/environment.dev";

const base_url = environment.baseUrl;

export class UsuarioModel{

    constructor(
        public name:   string,
        public email:  string,
        public role:   'ADMIN_ROLE' | 'USER_ROLE',
        public google?: boolean,
        public uid?:    string,
        public img?: string,
        public password?: string,
    ){}

    get imagenUrl() {
        if( !this.img){
            return `${ base_url }/upload/usuario/no-image`;
        } else if ( this.img.includes('https') ) {
            
            return this.img || `${ base_url }/upload/usuario/no-image`;
        } else if ( this.img ) {
            return `${ base_url }/upload/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/upload/usuario/no-image`;
        }
    }
}