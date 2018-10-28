import { Component, OnInit } from '@angular/core';
import { ObservacionesPreventivasService, UsuarioService } from 'src/app/services/service.index';
import { ObservacionesPreventivas } from 'src/app/models/observaciones.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';

declare var swal: any;

@Component({
  selector: 'app-observacion',
  templateUrl: './observacion.component.html',
  styles: []
})
export class ObservacionComponent implements OnInit {

  observacion: ObservacionesPreventivas = new ObservacionesPreventivas('', '', '', '', '', '');

  forma: FormGroup;
  fechaHoy: string = new Date().toISOString();
  usuarios: Usuario[] = [];
  usuarioSeleccionado: any;
  totalUsuarios: number = 0;
  desde: number = 0;
  id: string;

  observaciones: ObservacionesPreventivas[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _observacionesService: ObservacionesPreventivasService,
    public _usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute
  ) {

    activatedRoute.params.subscribe( params => {
      this.id = params['id'];
      if (this.id !== 'nuevo') {
        this.cargarObservacion(this.id);
      }
    });
   }

  ngOnInit() {

    this.cargarUsuarios();
    this.cargarObservaciones();

    this.forma = new FormGroup({
      usuario: new FormControl(null, Validators.required),
      formulario: new FormControl(null, Validators.required),
      zona: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
      repeticion: new FormControl(null, Validators.required)
    });

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
                                console.log(resp);
                                this.cargarObservaciones();
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

  cargarObservacion( id: string ) {
    this._observacionesService.obtenerObservacion(id).subscribe( (observacion: any) => {
      console.log(observacion);
      this.observacion = observacion;
      this.forma.get('usuario').setValue(this.observacion.usuario);
      this.forma.get('formulario').setValue(this.observacion.formulario);
      this.forma.get('zona').setValue(this.observacion.zona);
      this.forma.get('fecha').setValue(this.observacion.fecha.split('T')[0]);
      this.forma.get('repeticion').setValue(this.observacion.repeticion);

    });
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
