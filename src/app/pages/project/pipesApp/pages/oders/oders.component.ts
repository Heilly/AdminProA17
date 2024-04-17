import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Color, Hero } from '../../interfaces/hero.interface';
import { CanFlyPipe } from '../../pipes/can-fly.pipe';
import { SortByPipe } from '../../pipes/sort-by.pipe';
import { ToggleCasePipe } from '../../pipes/toggle-case.pipe';

@Component({
  selector: 'app-oders',
  templateUrl: './oders.component.html',
  standalone: true,
  imports: [CommonModule, CanFlyPipe, SortByPipe,ToggleCasePipe],
  styles: [`/* Estilo para el icono de flecha */
  .bi-arrow-up-down {
    transition: transform 0.3s ease;
  }
  
  /* Estilo para rotar el icono cuando está en orden descendente */
  .rotated {
    transform: rotate(180deg);
  }
  `]
})
export class OdersComponent {

  

  public isUpperCase: boolean = true;
  public orderBy?: keyof Hero;

  public heroes: Hero[] = [
    {
      name: 'Superman',
      canFly: true,
      color: Color.blue,
    },
    {
      name: 'Batman',
      canFly: false,
      color: Color.black,
    },
    {
      name: 'Daredevil',
      canFly: false,
      color: Color.red,
    },
    {
      name: 'Robin',
      canFly: false,
      color: Color.red,
    },
    {
      name: 'Linterna Verde',
      canFly: true,
      color: Color.green,
    },
  ]

  descendingOrder = true;

toggleOrder() {
  this.descendingOrder = !this.descendingOrder;
}

  toggleUpperCase():void {
    console.log('toggleUpperCase');
    this.isUpperCase = !this.isUpperCase;
  }

  changeOrder( value: keyof Hero ){
    console.log(value);
    this.orderBy = value;
  }
}
