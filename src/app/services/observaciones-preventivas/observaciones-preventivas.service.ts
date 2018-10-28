import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { ObservacionesPreventivas } from '../../models/observaciones.model';

import 'rxjs/add/operator/map';
import { Usuario } from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class ObservacionesPreventivasService {

  constructor(
    public http: HttpClient
  ) { }

  cargarObservaciones( desde: number = 0) {
    let url = URL_SERVICIOS + '/observacionespreventivas/?desde=' + desde;
    return this.http.get( url );
  }

  cargarObservacionesPendienteRealizar(desde: number = 0) {
    let url = URL_SERVICIOS + '/observacionespreventivas/estado/Pendiente Realizar?desde=' + desde;
    return this.http.get( url );
  }

  cargarObservacionesPendienteAprobacion(desde: number = 0) {
    let url = URL_SERVICIOS + '/observacionespreventivas/estado/Pendiente Aprobacion?desde=' + desde;
    return this.http.get( url );
  }

  cargarObservacionesAprobadas(desde: number = 0) {
    let url = URL_SERVICIOS + '/observacionespreventivas/estado/Aprobada?desde=' + desde;
    return this.http.get( url );
  }

  cargarObservacionesRechazadas(desde: number = 0) {
    let url = URL_SERVICIOS + '/observacionespreventivas/estado/Rechazada?desde=' + desde;
    return this.http.get( url );
  }

  cargarMisObservaciones(desde: number = 0, usuario: Usuario) {
    let url = URL_SERVICIOS + '/observacionespreventivas/mis-observaciones/' + usuario._id + '?desde=' + desde;
    return this.http.get( url );
  }

  obtenerObservacion( id: string ) {
    let url = URL_SERVICIOS + '/observacionespreventivas/observacion/' + id;
    return this.http.get( url ).map( (resp: any) => resp.observacion);
  }

  validarObservacion(observacion: ObservacionesPreventivas) {
    let url = URL_SERVICIOS + '/observacionespreventivas/validar/' + observacion._id;

    return this.http.put( url, observacion )
                    .map( () => {
                        swal('Obsevación Preventiva validada', 'La Obsevación Preventiva ha sido validada correctamente', 'success');
                        return true;
                    });
  }

  buscarObservacion( termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/observaciones/' + termino;
    return this.http.get( url )
                    .map( (resp: any) => resp.observaciones );
  }

  crearObservacion( observacion: ObservacionesPreventivas ) {

    let url = URL_SERVICIOS + '/observacionespreventivas';

    return this.http.post( url, observacion )
                    .map( (resp: any) => {
                      swal('Obsevación Preventiva creada!', 'Observación preventiva en la zona: ' + observacion.zona, 'success');
                      return resp.observacion;
                    });
 }

  actualizarObservacion( observacion: ObservacionesPreventivas ) {

    let url = URL_SERVICIOS + '/observacionespreventivas/' + observacion._id;

    return this.http.put( url, observacion )
                    .map( (resp: any) => {
                      swal('Obsevación Preventiva actualizada!', 'Observación preventiva en la zona: ' + observacion.zona, 'success');
                      return true;
                    });
  }

  borrarObservacion( id: string ) {
    let url = URL_SERVICIOS + '/observacionespreventivas/' + id;

    return this.http.delete( url )
                    .map( () => {
                        swal('Obsevación Preventiva borrado', 'La Obsevación Preventiva ha sido eliminado correctamente', 'success');
                        return true;
                    });
  }
}
