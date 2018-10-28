import { Component, OnInit } from '@angular/core';
import { ObservacionesPreventivasService } from '../../services/service.index';
import { ObservacionesPreventivas } from '../../models/observaciones.model';
import { Usuario } from '../../models/usuario.model';

declare var swal: any;

@Component({
  selector: 'app-mis-observaciones',
  templateUrl: './mis-observaciones.component.html',
  styles: []
})
export class MisObservacionesComponent implements OnInit {

  observaciones: ObservacionesPreventivas[] = [];
  observacion: ObservacionesPreventivas = new ObservacionesPreventivas('', '', '', '', '', '');
  cargando: boolean = true;
  totalRegistros: number = 0;
  desde: number = 0;
  usuario: Usuario;

  constructor(
    public _observacionesService: ObservacionesPreventivasService
  ) { }

  ngOnInit() {

    this.cargarObservaciones();

  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarObservaciones();
  }

  cargarObservaciones() {
    this.cargando = true;
    this.usuario = JSON.parse( localStorage.getItem('usuario') );
    this._observacionesService.cargarMisObservaciones( this.desde, this.usuario )
                        .subscribe( (resp: any) => {
                          this.totalRegistros = resp.total;
                          this.observaciones = resp.observaciones;
                          this.cargando = false;
                        });
  }

  validarObservacion( observacion: ObservacionesPreventivas ) {
    // console.log('Tarea con id: ' + observacion._id + 'en zona: ' + observacion.zona + ' validada');
     this._observacionesService.validarObservacion( observacion )
                                 .subscribe();
   }

  borrarObservacion( observacion: ObservacionesPreventivas ) {

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar una observación preventiva',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      if (borrar) {
          this._observacionesService.borrarObservacion( observacion._id )
                              .subscribe( borrado => {
                                  console.log( borrado );
                                  this.cargarObservaciones();
                              });
      }
    });
  }
}
