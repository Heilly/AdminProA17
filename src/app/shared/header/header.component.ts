import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { UsuarioservService } from '../../serivices/usuarioserv.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  isMiniSidebarActive: boolean = true;

  toggleSidebar(): void {
    this.isMiniSidebarActive = !this.isMiniSidebarActive;
    if (this.isMiniSidebarActive) {
      document.body.classList.add('mini-sidebar');
    } else {
      document.body.classList.remove('mini-sidebar');
    }
  }



  
  private usuarioServ = inject( UsuarioservService );
  private router = inject( Router );

  @ViewChild('txtTermino') input?: ElementRef<HTMLInputElement>;

  
  public usuario : UsuarioModel;


  constructor(){

    this.usuario = this.usuarioServ.usuario;
    //console.log('img',this.usuario.img);
    //console.log( 'imagenUrl',this.usuario.imagenUrl);
  }

  buscar(termino: string) {
    if( termino.length === 0 ){ 
      this.router.navigateByUrl('/dashboard');
      return;
    }
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

  clearInput(){
    //console.log(this.input?.nativeElement.value);
    if( !this.input ) return;
    this.input.nativeElement.value ='';
    
  }



  logout(){
    this.usuarioServ.logout();
  }

}
