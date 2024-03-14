import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'shared-increment',
  templateUrl: './increment.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class IncrementComponent implements OnInit {

  ngOnInit(): void {
      this.btnClass = `btn ${ this.btnClass }`;
  }

  @Input() progresss : number = 0;
  @Input() btnClass : string = '';
  @Output() valueEmit = new EventEmitter<number>();
  

  
  changeValue( value: number ){
    if( this.progresss >= 100 ) {
      this.valueEmit.emit( 100 );console.log('1');
      return this.progresss = 100 ;
      
    }

    if( this.progresss <= 0 && value < 0 ) {
      this.valueEmit.emit( 0 ); console.log('2');
      return this.progresss = 0;}

      this.progresss = this.progresss + value;
      console.log('3');
      this.valueEmit.emit( this.progresss );
      return;
  }

  onChange(newvalor: number){
    if(newvalor >= 100) {
      this.progresss = 100;
      console.log('1 ', this.progresss);
    } else if(newvalor < 0) {
       this.progresss = 0;
       console.log('2 ', this.progresss);

    } else {
      this.progresss = newvalor;
      console.log('3 ', this.progresss);

    }

    this.valueEmit.emit( this.progresss );
  }
}
