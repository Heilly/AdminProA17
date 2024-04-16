import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazyimage.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class LazyimageComponent {

  @Input()
  public url!: string;

  @Input()
  public alt: string = '';


  public hasLoaded: boolean = false;


  ngOnInit(): void {
    if ( !this.url ) throw new Error('URL property is required');
  }

  onLoad() {
    this.hasLoaded = true;
  }
}
