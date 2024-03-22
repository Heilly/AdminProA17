import { Component, computed, inject } from '@angular/core';
import { UsuarioservService } from '../../serivices/usuarioserv/usuarioserv.service';
import { ImgservService } from '../../serivices/imgserv/imgserv.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  private usuarioServ = inject( UsuarioservService );
  private imgServ = inject( ImgservService );

  public imgUrl = '';
  public usuario = computed( () => this.usuarioServ.usuario() );


  constructor(){
    this.imgUrl = this.imgServ.imgUserUrl();
    //console.log(this.imgUrl);
  }



  logout(){
    this.usuarioServ.logout();
  }

}
