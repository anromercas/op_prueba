import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-nofoundpage',
  templateUrl: './nofoundpage.component.html',
  styles: []
})
export class NofoundpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }


}
