import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basicspage',
  templateUrl: './basicspage.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BasicspageComponent {

  public nameLower: string = 'Heilly';
  public nameUpper: string = 'HEILLY';
  public fullName: string = 'HeIlLy PeRdOmO';

  public customDate: Date = new Date();
}
