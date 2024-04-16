import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class SidebarComponent {

  constructor( private gifsService: GifsService  ) {}

  get tags(): string[] {
    return this.gifsService.tagsHistory;
  }

  searchTag( tag: string ):void {
    this.gifsService.searchTag( tag );
  }
}
