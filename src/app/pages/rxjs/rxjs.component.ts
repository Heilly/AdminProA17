import { Component, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription, catchError, filter, interval, map, of, retry, take, tap } from 'rxjs';

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
   filter() devulve un boolean, filtra la data si cumple con la condicion
   unsubscribe() necesito implementar el OnDestroy
*/

  public intervalSub : Subscription;
  public contador = signal<number>(0);
  public contadorInterval = signal<number>(0);
  public mensajeInterval = signal<string>('');
  public mensajeIntervalError = signal<string>('');


  constructor(){
    
    /*this.returnObservable().pipe(
      retry(1),
    ).subscribe( 
        valor => console.log('sub ', valor),
        (err) => console.warn( 'Error ', err ),
        () => console.info('el obs terminó') );*/
        this.returnObservable().subscribe()

    this.intervalSub = this.returnInterval().subscribe( console.log )
  }
  ngOnDestroy(): void {
    this.intervalSub.unsubscribe( )
  }
//Se emite cada 1 segundo, solo los numeros pares
  returnInterval() : Observable<number>{
    return interval( 500 )
            .pipe(
              map( value => value + 1 ),
              filter( value => (value % 2 === 0) ? true : false  ),

              take( 100 ),
              tap(  value => this.contador.set(value))
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
        this.mensajeInterval.set(`${i}`)
        //cancelar el interval 
        if( i === 10 ){
          clearInterval( interval );
          observer.complete();
        }
        //mostrar un error y terminar con la emision
        if( i === 9 ){
          observer.error( 'i llego al valor 2' );
          this.mensajeIntervalError.set('i llego al valor 9')
          clearInterval( interval );
        }
      }, 1000 )}
    );
      return obs$;
  }



}
