import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Tablero Principal', url: '/dashboard' },
        { titulo: 'Graficas', url: '/graficas1' },

      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo : 'Observaciones Preventivas', url: '/observaciones' },
        { titulo : 'Mis Observaciones Preventivas', url: '/mis-observaciones' },
        { titulo : 'Crear Observacion Preventiva', url: '/observacion/nuevo' }

      ]
    }
  ];

  constructor() { }
}
