import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnDestroy {

  /*
  this.router.events devuelve instancias que sirvieron para hacer la construccion de la ruta
  utilizando instanceof comparamas si la funcion ActivationEnd forma parte de esta construccion
  */

  private router = inject( Router );
  private route = inject( ActivatedRoute );

  public title : string = '';
  public titleSub$ : Subscription;

  constructor() {
    console.log(this.route);

    this.titleSub$ = this.getArguments().subscribe(  value => { 
                          console.log(value?.title?.toString());
                          if( value === null || value === undefined ) return this.title = 'No Title'; 
                          if ( value.title === undefined ) return this.title = 'No Title'; 
                          
                          document.title = `AdminPro - ${value.title.toString()}` ;
                          return this.title = value.title.toString();
                        } );
    /*
    Obtener un Array de mis rutas hijas, Puedo obtener la data y otros valores
    this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter( (event) => event.snapshot.firstChild !== null ),
        filter( event =>{
          if( event.snapshot.routeConfig === null) return false;
          if( !event.snapshot.routeConfig.children && event.snapshot.routeConfig.children === 0 ) return false;
          return true;
        }),
        map( (event: ActivationEnd ) => event.snapshot.routeConfig?.children )

      )
      .subscribe( console.log )*/
  }
  ngOnDestroy(): void {
    this.titleSub$.unsubscribe();
  }

  getArguments(){
    return this.router.events
      .pipe(
        filter( (event): event is ActivationEnd => event instanceof ActivationEnd),
        filter( (event) => event.snapshot.firstChild !== null ),
        filter( (event) => event.snapshot.url.length === 0 ),
        map( (event: ActivationEnd ) => event.snapshot.firstChild?.routeConfig)

      );
      
  }
}
