import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from '../../components/search-box/search-box.component';
import { CardListComponent } from '../../components/card-list/card-list.component';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [CommonModule, SearchBoxComponent, CardListComponent, SidebarComponent],
})
export class HomeComponent {
  private gifsService = inject(GifsService);

  public gifs = computed( () => this.gifsService.gifList() );

}
