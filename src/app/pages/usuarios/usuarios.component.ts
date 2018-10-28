import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  cargando: boolean = true;

  totalRegistros: number = 0;

  constructor(
    public _usuarioServce: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
                            .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostarModal( 'usuarios' , id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioServce.cargarUsuarios( this.desde )
                        .subscribe( (resp: any) => {
                          this.totalRegistros = resp.total;
                          this.usuarios = resp.usuarios;
                          this.cargando = false;
                        });
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
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this._usuarioServce.buscarUsuarios( termino )
                        .subscribe( (usuarios: Usuario[]) => {
                            this.usuarios = usuarios;
                            this.cargando = false;

    });
  }

  borrarUsuario( usuario: Usuario ) {
    if ( usuario._id === this._usuarioServce.usuario._id ) {
        swal('No puede borrar el usuario', 'No se puede borrar a si mismo', 'error');
        return;
    }

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre + ' ' + usuario.apellido ,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      if (borrar) {
          this._usuarioServce.borrarUsuario( usuario._id )
                              .subscribe( borrado => {
                                  console.log( borrado );
                                  this.cargarUsuarios();
                              });
      }
    });
  }

  guardarUsuario( usuario: Usuario ) {
    this._usuarioServce.actualizarUsuario( usuario )
                        .subscribe();
  }

}
