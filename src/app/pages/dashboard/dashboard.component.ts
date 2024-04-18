import { Component, inject } from '@angular/core';
import { SidebarservService } from '../../serivices/sidebarserv.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  public sidebarServ = inject( SidebarservService )

}
