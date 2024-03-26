import { Component, inject } from '@angular/core';
import { UsuarioservService } from '../../serivices/usuarioserv/usuarioserv.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioDB } from '../../interfaces/UsuarioDB.inetrface';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  private usuarioServ = inject( UsuarioservService );

  
  public usuario : UsuarioModel;


  constructor(){

    this.usuario = this.usuarioServ.usuario;
    //console.log('img',this.usuario.img);
    //console.log( 'imagenUrl',this.usuario.imagenUrl);

  }



  logout(){
    this.usuarioServ.logout();
  }

}
