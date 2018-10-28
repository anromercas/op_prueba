import { Component, OnInit } from '@angular/core';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styles: []
})
export class GoogleMapsComponent implements OnInit {

  title: string = 'My first AGM project';
  lat: number = 42.869084122606075;
  lng: number = -2.672724723815918
  ;
  zoom: number = 16;

  data: any = {
    'marcador1': {
      'lat': 42.86447444052918,
      'lng': -2.669183494563981
    },
    'marcador2': {
      'lat': 42.86674705409428,
      'lng': -2.6710503120383464
    },
    'marcador3': {
      'lat': 42.86485353714293,
      'lng': -2.6731860637664795
    },
  };


  constructor() { }

  ngOnInit() {
  }

  onChoseLocation( event ) {
    console.log(event);
  }

}
