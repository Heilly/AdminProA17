import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { IncrementComponent } from '../../shared/components/sharedComponent.barrel'

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [CommonModule, FormsModule, IncrementComponent ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  

  public progres1 : number = 50;
  public progres2 : number = 15;




  get getProgreso1(){
    return `${ this.progres1 }%`
  }
  get getProgreso2(){
    return `${ this.progres2 }%`
  }

  getValueEmmited(value : number ){
    return this.progres1 = value;
  }

}
