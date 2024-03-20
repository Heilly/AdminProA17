import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioservService } from '../../serivices/usuarioserv/usuarioserv.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  private usuarioServ = inject( UsuarioservService );
  private router = inject( Router );

  logout(){
    this.usuarioServ.logout();
  }

}
