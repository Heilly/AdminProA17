import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';
import { UsuarioservService } from '../../serivices/usuarioserv.service';
import { SidebarservService } from '../../serivices/sidebarserv.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  private usuarioServ = inject( UsuarioservService );
  public sidebarServ = inject( SidebarservService )
  private router = inject( Router );

  public subMenuDashboard  = [];

  public usuario : UsuarioModel;
  constructor(){

    this.subMenuDashboard = this.sidebarServ.cargarMenu();
    console.log( 'subMenuDashboard',this.subMenuDashboard);

    this.usuario = this.usuarioServ.usuario;
  }

  logout(){
    this.usuarioServ.logout();
  }





}
