import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput') tagInput! : ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService ) { }

  searchTag() {
    
    const newTag = this.tagInput.nativeElement.value;
    if( newTag === '' ) return;
    console.log(newTag);

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';

  }

}
