import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Gif } from '../../interfaces/gifs.interfaces';
import { LazyimageComponent } from '../lazyimage/lazyimage.component';

@Component({
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
  standalone: true,
  imports: [CommonModule, LazyimageComponent],
})
export class CardListComponent {


  @Input() gifs : Gif[] = [];



}
