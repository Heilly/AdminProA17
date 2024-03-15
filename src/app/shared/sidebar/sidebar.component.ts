import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  subMenuDashboard = [
    { url: '/dashboard/progress', title: 'Progress' },
    { url: '/dashboard/promise', title: 'Promise' },
    { url: '/dashboard/rxjs', title: 'RxJs' },
  ]


}
