import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { BusquedasService } from '../../serivices/busquedas.service';
import { UsuarioModel } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { MedicosModel } from '../../models/medico.model';
import { ImagenpipePipe } from '../../shared/pipes/imagenpipe/imagenpipe.pipe';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  standalone: true,
  imports: [CommonModule, ImagenpipePipe, RouterLink],
})
export class BusquedaComponent implements OnInit {
  
  private buscarSerc = inject(BusquedasService);

  private route = inject(ActivatedRoute);
  private sub$ = Subscription;

  public comodin = true;
  public usuarios : UsuarioModel[] = [];
  public hospitales : Hospital[] = [];
  public medicos : MedicosModel[] = [];

  constructor(){
   

  }
  ngOnInit(): void {
    this.route.params
        .subscribe( ({termino}) => this.busquedaGlobal(termino) )
  }


  busquedaGlobal(termino: string){
    this.buscarSerc.busquedaGlobal(termino)
        .subscribe( (resp: any) => {
          this.usuarios = resp['usuarios'];
          this.hospitales = resp['hospitales'];
          this.medicos = resp['medicos'];

          
        
        } )
  }
}
