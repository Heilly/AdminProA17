import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioservService } from '../../../serivices/usuarioserv.service';
import { UsuarioModel } from '../../../models/usuario.model';
import { delay, pipe, Subscription } from 'rxjs';
import { Tipo } from '../../../interfaces/tipo.type';
import Swal from 'sweetalert2';
import { FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalimagenservService } from '../../../serivices/modalimagenserv.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  private usuarioServ = inject( UsuarioservService );
  public modalImgServ = inject( ModalimagenservService );

  public usuariologged = this.usuarioServ.usuario;

  public usuariosList: UsuarioModel[] = [];
  public usuariosTemp: UsuarioModel[] = [];
  public totalUsuario: number = 0;
  public desde: number = 0;
  public imgSub$? : Subscription;

  @ViewChild('inputBuscar') inputBuscar? : ElementRef;
  public cargando: boolean = true;


  

  constructor(){
    console.log(this.usuariologged);
  }


  ngOnDestroy(): void {
    this.imgSub$?.unsubscribe();
  }
  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSub$ = this.modalImgServ.nuevaImagen
      .pipe(delay(100))
      .subscribe( img => {
        this.cargarUsuarios();
      })
    
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioServ.cargarUsuarios( this.desde )
    .subscribe(usuarios => {
      this.totalUsuario = usuarios.total;
      this.usuariosList = usuarios.usuarios;
      this.usuariosTemp = usuarios.usuarios;
      //console.log(this.usuariosList);
      this.cargando= false;
    })
  }

  cambiarPagina( valor : number ) {
    this.desde += valor;
    if(this.desde < 0 ){
      this.desde = 0
    } else if( this.desde >= this.totalUsuario ){
        this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscarUsuario(){
    const value = this.inputBuscar?.nativeElement.value;
    const tipo: Tipo = 'usuarios';
    //console.log(value.length);
    if(value.length === 0){
       this.usuariosList = this.usuariosTemp;
      return
    }

    this.usuarioServ.buscarUsuario(tipo, value)
        .subscribe( usuarios => {
          //console.log( 'ts',usuarios);
          this.usuariosList = usuarios
        } )
  }


  eliminarUsuario( usuario: UsuarioModel ){

    if(usuario.uid === this.usuariologged.uid){
       Swal.fire( 'Error', 'No puede borrarse a si mismo', 'error' );
       return;
    }

    if(!usuario) return;
    Swal.fire({
      title: "¿Borrar usuario?",
      text: `Esta a punto de borrar a ${usuario.name}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioServ.eliminarUsuario(usuario)
        .subscribe( data => {
          Swal.fire({
          title: "Eliminado!",
          text: `${usuario.name} ha sido eliminado.`,
          icon: "success"
        });
        this.cargarUsuarios();
        } )
        
      }
    });
  } 


  cambiarRole( usuario: UsuarioModel){
    console.log(usuario.role);
    console.log(usuario.uid);
    this.usuarioServ.guardarUsuario(usuario)
        .subscribe( data =>console.log(data) )
  }


  abrirModal( usuario: UsuarioModel ) {
    console.log(usuario.img);
  if (usuario.uid){
    this.modalImgServ.abrirModal('usuarios', usuario.uid, usuario.img );}
  }
}
