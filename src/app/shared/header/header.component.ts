import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { UsuarioservService } from '../../serivices/usuarioserv.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsuarioModel } from '../../models/usuario.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { timer } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit{



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
  public isAuth: boolean = false;


  constructor(){

    this.usuario = this.usuarioServ.usuario;
    this.usuarioServ.validarToken().subscribe( auth => { 
      this.isAuth = auth 
      console.log( 'constructor' ,this.isAuth);
    });

    this.showItem()

    //console.log('img',this.usuario.img);
    //console.log( 'imagenUrl',this.usuario.imagenUrl);
  }


  ngAfterViewInit(): void {
    console.log( 'ngAfterViewInit' ,this.isAuth);
    timer(300).subscribe( () => {
      document.querySelectorAll('.hidden-element').forEach( elememt => {
        console.log('hola');
        if(this.isAuth){
          console.log('isAuth');
          elememt.classList.add('d-block');
        } else {
          console.log('isnotAuth');
          elememt.classList.add('d-none')
        }
      } )
    } )
    
  }

  showItem(){
    
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
