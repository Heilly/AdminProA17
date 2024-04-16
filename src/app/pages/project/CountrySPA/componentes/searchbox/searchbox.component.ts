import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'country-searchbox',
  templateUrl: './searchbox.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class SearchboxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    //manejar eventos de entrada con un retraso de tiempo
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe( value => {
      this.onDebounce.emit( value );
    });
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }
/*
  emitValue( value: string ):void {
    this.onValue.emit( value );
  }
*/
  onKeyPress( searchTerm: string ) {
    this.debouncer.next( searchTerm );
  }

}
