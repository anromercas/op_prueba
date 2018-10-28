import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styles: []
})
export class FormularioComponent implements OnInit {

  seleccionado: boolean[] = [false, false, false, false, false, false];

  constructor() { }

  ngOnInit() {
  }

}
