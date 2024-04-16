import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'country-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  standalone: true,
  imports: [CommonModule],
  styles: [
    `.spinner-container {
      align-items: center;
      background-color: black;
      border-radius: 20px;
      bottom: 15px;
      color: white;
      display: flex;
      padding: 5px 10px;
      position: fixed;
      right: 15px;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
    }
    
    span {
      margin-left: 5px;
    }`
  ]
})
export class LoadingSpinnerComponent {}
