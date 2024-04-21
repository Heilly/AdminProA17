import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
})
export class AboutmeComponent {

  correo: string = 'heilly.perdomo.910812@gmail.com'
}
