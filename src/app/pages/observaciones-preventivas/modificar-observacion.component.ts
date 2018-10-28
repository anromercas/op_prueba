import { Component, OnInit } from '@angular/core';
import { ObservacionesPreventivasService, UsuarioService } from 'src/app/services/service.index';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { ObservacionesPreventivas } from 'src/app/models/observaciones.model';

@Component({
  selector: 'app-modificar-observacion',
  templateUrl: './modificar-observacion.component.html',
  styles: []
})
export class ModificarObservacionComponent implements OnInit {

  observacion: ObservacionesPreventivas = new ObservacionesPreventivas('', '', '', '', '', '');
  id: string;
  forma: FormGroup;
  fechaHoy: string = new Date().toISOString();
  usuarios: Usuario[] = [];
  usuarioSeleccionado: any;
  totalUsuarios: number = 0;
  desde: number = 0;

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

    this.forma = new FormGroup({
      usuario: new FormControl(null, Validators.required),
      formulario: new FormControl(null, Validators.required),
      zona: new FormControl(null, Validators.required),
      fecha: new FormControl(null, Validators.required),
      repeticion: new FormControl(null, Validators.required)
    });

  }

  cargarUsuarios() {
    this._usuarioService.cargarUsuarios( this.desde )
                        .subscribe( (resp: any) => {
                          this.totalUsuarios = resp.total;
                          this.usuarios = resp.usuarios;
                        });
  }

  cambioUsuario( id: string ) {

    this._observacionesService.obtenerObservacion( id )
          .subscribe( observacion => this.observacion = observacion );

  }

  guardarObservacion( observacion: ObservacionesPreventivas ) {
    this._observacionesService.actualizarObservacion( observacion )
                        .subscribe();
  }

  cargarObservacion( id: string ) {
    this._observacionesService.obtenerObservacion(id).subscribe( (observacion: any) => {
      this.observacion = observacion;
      this.forma.get('usuario').setValue(this.observacion.usuario);
      this.forma.get('formulario').setValue(this.observacion.formulario);
      this.forma.get('zona').setValue(this.observacion.zona);
      this.forma.get('fecha').setValue(this.observacion.fecha.split('T')[0]);
      this.forma.get('repeticion').setValue(this.observacion.repeticion);

    });
  }

}
