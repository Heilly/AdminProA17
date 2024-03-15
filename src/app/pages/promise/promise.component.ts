import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-promise',
  templateUrl: './promise.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class PromiseComponent implements OnInit {
  ngOnInit(): void {
    this.getUser().then( user => console.log(user) )
  }

  getUser(){

    return new Promise( resolve => {
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => resolve(body.data))
    });
  }
}
