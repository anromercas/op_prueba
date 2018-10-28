import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  totalUsuarios: number = 0;
  usuarios: Usuario[] = [];
  desde: number = 0;

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this._usuarioService.cargarUsuarios( this.desde )
                        .subscribe( (resp: any) => {
                          this.totalUsuarios = resp.total;
                          this.usuarios = resp.usuarios;
                        });
  }


}
