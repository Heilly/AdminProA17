import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../../interfaces/country';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-table',
  templateUrl: './country-table.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
  styles: [
    `img {
      width: 25px;
    }`
  ]
})
export class CountryTableComponent {
  @Input()
  public countries: Country[] = [];
}
