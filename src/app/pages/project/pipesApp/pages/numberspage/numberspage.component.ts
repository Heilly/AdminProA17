import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-numberspage',
  templateUrl: './numberspage.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class NumberspageComponent {

  public totalSells: number = 2567789.5567;
  public percent: number = 0.4856;
}
