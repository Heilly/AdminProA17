import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbsComponent } from '../shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from '../shared/header/header.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { ModalimagenComponent } from '../shared/components/sharedComponent.barrel';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, BreadcrumbsComponent, ModalimagenComponent, RouterOutlet],
  templateUrl: './pages.component.html'
})
export class PagesComponent {

}
