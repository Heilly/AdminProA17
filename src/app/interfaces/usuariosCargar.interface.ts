// Generated by https://quicktype.io

import { UsuarioModel } from "../models/usuario.model";
import { UsuarioDB } from "./UsuarioDB.inetrface";



export interface GetUsuario {
    ok:       boolean;
    usuarios: UsuarioModel[];
    total:    number;
}
