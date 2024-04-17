import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommonpage',
  templateUrl: './uncommonpage.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class UncommonpageComponent {

  // i18n Select
  public name: string = 'Heilly';
  public gender: 'male'|'female' = 'female';
  public invitationMap = {
    male: 'invitarlo',
    female: 'invitarla'
  }

  changeClient():void {
    this.name = 'Luis';
    this.gender = 'male';
  }

  // i18nPlural
  public clients: string[] = ['Maria','Pedro','Fernando', 'Hernando', 'Eduardo', 'Melissa', 'Natalia'];
  public clientsMap = {
    '=0': 'no tenemos ningún cliente esperando.',
    '=1': 'tenemos un cliente esperando.',
    '=2': 'tenemos 2 personas esperando.',
    'other': 'tenemos # clientes esperando.',
  }

  deleteClient(): void {
    this.clients.shift();
  }

  // KeyValue Pipe
  public person = {
    name: 'Heilly',
    age: 32,
    address: 'Madrid, España',
  }

  // Async Pipe
  public myObservableTimer: Observable<number> = interval(2000).pipe(
    tap( value => console.log('tap:', value ) ),
  );

  public promiseValue: Promise<string> = new Promise( (resolve, reject) => {
    setTimeout(() => {
      resolve( 'Tenemos data en la promesa.' );
      console.log( 'Tenemos data en la promesa.' );
      this.person.name = 'Otro nombre'
    }, 3500);
  })

}
