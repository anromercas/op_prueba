import { Component, OnInit } from '@angular/core';
import { ObservacionesPreventivas } from '../../models/observaciones.model';
import { ObservacionesPreventivasService } from '../../services/service.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { map } from 'rxjs/operators';


declare var swal: any;

@Component({
  selector: 'app-observaciones-preventivas',
  templateUrl: './observaciones-preventivas.component.html',
  styles: []
})
export class ObservacionesPreventivasComponent implements OnInit {

  observacion: ObservacionesPreventivas = new ObservacionesPreventivas('', '', '', '', '', '');

  observaciones: ObservacionesPreventivas[] = [];

  observacionesPendienteAprobacion: ObservacionesPreventivas[] = [];
  observacionesPendienteRealizar: ObservacionesPreventivas[] = [];
  observacionesAprobadas: ObservacionesPreventivas[] = [];
  observacionesRechazadas: ObservacionesPreventivas[] = [];

  usuarios: Usuario[] = [];
  usuarioSeleccionado: any;
  totalUsuarios: number = 0;

  cargando: boolean = true;
  cargandoPendienteAprobacion: boolean = true;
  cargandoPendienteRealizar: boolean = true;
  cargandoAprobadas: boolean = true;
  cargandoRechazadas: boolean = true;

  totalRegistros: number = 0;
  totalRegistrosPendienteRealizar: number = 0;
  totalRegistrosPendienteAprobar: number = 0;
  totalRegistrosAprobadas: number = 0;
  totalRegistrosRechazadas: number = 0;

  forma: FormGroup;
  fechaHoy: string = new Date().toISOString();
  estado: string;

  desde: number = 0;
  desdePendienteRealizar: number = 0;
  desdePendieteAprobacion: number = 0;
  desdeAprobada: number = 0;
  desdeRechazada: number = 0;


  constructor(
    public _observacionesService: ObservacionesPreventivasService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarObservaciones();
    this.cargarObservacionesPendienteAprobacion();
    this.cargarObservacionesPendienteRealizar();
    this.cargarObservacionesAprobadas();
    this.cargarObservacionesRechazadas();
    this.cargarUsuarios();


    this.forma = new FormGroup({
      usuario: new FormControl(null, Validators.required),
      formulario: new FormControl(null, Validators.required),
      zona: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
      repeticion: new FormControl(null, Validators.required)
    });

  }

  buscarObservacionPendienteRealizar( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarObservacionesPendienteRealizar();
      return;
    }

    /* this.cargando = true;
    this._observacionesService.buscarObservacion( termino )
                        .subscribe( (observaciones: ObservacionesPreventivas[]) => {
                            this.observacionesPendienteRealizar = observaciones;
                            this.cargando = false;
    }); */
  }

  cargarObservaciones() {
    this.cargando = true;
    this._observacionesService.cargarObservaciones( this.desde )
                        .subscribe( (resp: any) => {
                          this.totalRegistros = resp.total;
                          this.observaciones = resp.observaciones;
                          this.cargando = false;
                        });

  }

  cambiarDesde( valor: number, estado: string ) {
    let desdePendienteAprobacion = this.desdePendieteAprobacion + valor;
    let desdePendienteRealizar = this.desdePendienteRealizar + valor;
    let desdeAprobada = this.desdeAprobada + valor;
    let desdeRechazada = this.desdeRechazada + valor;
    let desde = this.desde + valor;

    switch (estado) {
      case 'Pendiente Aprobacion':

        if ( desdePendienteAprobacion >= this.totalRegistrosPendienteAprobar ) { return; }
        if ( desdePendienteAprobacion < 0 ) { return; }

        this.desdePendieteAprobacion += valor;
        this.cargarObservacionesPendienteAprobacion();
      break;

      case 'Pendiente Realizar':

        if ( desdePendienteRealizar >= this.totalRegistrosPendienteRealizar ) { return; }
        if ( desdePendienteRealizar < 0 ) { return; }

        this.desdePendienteRealizar += valor;
        this.cargarObservacionesPendienteRealizar();
      break;

      case 'Aprobada':

        if ( desdeAprobada >= this.totalRegistrosAprobadas ) { return; }
        if ( desdeAprobada < 0 ) { return; }

        this.desdeAprobada += valor;
        this.cargarObservacionesAprobadas();
      break;

      case 'Rechazada':

        if ( desdeRechazada >= this.totalRegistrosRechazadas ) { return; }
        if ( desdeRechazada < 0 ) { return; }

        this.desdeRechazada += valor;
        this.cargarObservacionesRechazadas();
      break;

      default:
        if ( desde >= this.totalRegistros ) { return; }
        if ( desde < 0 ) { return; }

        this.desde += valor;
        this.cargarObservaciones();
      break;

    }
  }

  aprobarObservacion( observacion: ObservacionesPreventivas ) {
    swal('Observacion Preventiva Validada', 'Se ha validado la observación: ' + observacion.formulario, 'success');
   // console.log('Tarea con id: ' + observacion._id + 'en zona: ' + observacion.zona + ' validada');
    /* this._observacionesService.validarObservacion( observacion )
                                .subscribe((resp)=> {

                                }); */
  }

  crearObservacion() {
    let valor = this.forma.value;
    this.observacion = new ObservacionesPreventivas(
      this.fechaHoy,
      valor.usuario,
      valor.formulario,
      valor.fecha,
      valor.zona,
      valor.repeticion
    );

    this._observacionesService.crearObservacion( this.observacion )
                              .subscribe( (resp: any) => {
                                this.cargarObservacionesPendienteAprobacion();
                                this.cargarObservacionesPendienteRealizar();
                                this.cargarObservacionesAprobadas();
                                this.cargarObservacionesRechazadas();
                              });
  }

  cargarUsuarios() {
    this._usuarioService.cargarUsuarios( this.desde )
                        .subscribe( (resp: any) => {
                          this.totalUsuarios = resp.total;
                          this.usuarios = resp.usuarios;
                        });
  }

  guardarObservacion( observacion: ObservacionesPreventivas ) {
    this._observacionesService.actualizarObservacion( observacion )
                        .subscribe();
  }

  cargarObservacionesPendienteRealizar() {
    this.cargandoPendienteRealizar = true;
    this._observacionesService.cargarObservacionesPendienteRealizar( this.desde )
                        .subscribe( (resp: any) => {
                          this.totalRegistrosPendienteRealizar = resp.total;
                          this.observacionesPendienteRealizar = resp.observaciones;
                          this.cargandoPendienteRealizar = false;
                        });
  }

  cargarObservacionesPendienteAprobacion() {
    this.cargandoPendienteAprobacion = true;
    this._observacionesService.cargarObservacionesPendienteAprobacion( this.desde )
                        .subscribe( (resp: any) => {
                          this.totalRegistrosPendienteAprobar = resp.total;
                          this.observacionesPendienteAprobacion = resp.observaciones;
                          this.cargandoPendienteAprobacion = false;
                        });
  }

  cargarObservacionesAprobadas() {
    this.cargandoAprobadas = true;
    this._observacionesService.cargarObservacionesAprobadas( this.desde )
                        .subscribe( (resp: any) => {
                          this.totalRegistrosAprobadas = resp.total;
                          this.observacionesAprobadas = resp.observaciones;
                          this.cargandoAprobadas = false;
                        });
  }

  cargarObservacionesRechazadas() {
    this.cargandoRechazadas = true;
    this._observacionesService.cargarObservacionesRechazadas( this.desde )
                        .subscribe( (resp: any) => {
                          this.totalRegistrosRechazadas = resp.total;
                          this.observacionesRechazadas = resp.observaciones;
                          this.cargandoRechazadas = false;
                        });
  }


  recordatorio( nombre: string, apellido: string) {
    swal('Recordatorio enviado', 'recordatorio enviado al usuario: ' + nombre + ' ' + apellido, 'success');
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
                                  this.cargarObservacionesPendienteAprobacion();
                                  this.cargarObservacionesPendienteRealizar();
                                  this.cargarObservacionesAprobadas();
                                  this.cargarObservacionesRechazadas();
                              });
      }
    });
  }

}
