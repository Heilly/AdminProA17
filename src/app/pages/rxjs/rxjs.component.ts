import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, catchError, filter, interval, map, of, retry, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class RxjsComponent implements OnDestroy {
/* Retry(1)  cuantas veces quiero que lo intente a pesar del error
   Take(4) cuantas emisiones del Observable necesita para completar el observable
   map() modificar el valor que recibe el observable y devuelve un nuevo valor
   filter() deviulve un boolean, filtra la data si cumple con la condicion
   unsubscribe() necesito implementar el OnDestroy
*/

  public intervalSub : Subscription;

  constructor(){
    
    /*this.returnObservable().pipe(
      retry(1),
    ).subscribe( 
        valor => console.log('sub ', valor),
        (err) => console.warn( 'Error ', err ),
        () => console.info('el obs terminó') );*/

    this.intervalSub = this.returnInterval().subscribe( console.log )
  }
  ngOnDestroy(): void {
    this.intervalSub.unsubscribe( )
  }

  returnInterval() : Observable<number>{
    return interval( 100 )
            .pipe(
              map( value => value + 1 ),
              filter( value => (value % 2 === 0) ? true : false  ),
              take( 100 )
            )
            
  }

  returnObservable() : Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>( observer =>{
      
      //Para cancelar el setInterval lo declaro como variable y luego lo cancelo
       const interval = setInterval( () => {
        
        //Si quiero emitir un valor next()
        i++;
        observer.next(i);

        //cancelar el interval 
        if( i === 4 ){
          clearInterval( interval );
          observer.complete();
        }
        //mostrar un error y terminar con la emision
        if( i === 2 ){
          observer.error( 'i llego al valor 2' );
          clearInterval( interval );
        }
      }, 1000 )}
    );
      return obs$;
  }



}
