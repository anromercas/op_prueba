import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
      break;

      case 'sdr':
        url += '/sdrs/' + img;
      break;

      case 'ideal':
        url += '/ideales/' + img;
      break;

      case 'parcial':
        url += '/parciales/' + img;
      break;

      case 'parche':
      url += '/parches/' + img;
      break;

      default:
      console.log('tipo de imagen no existe, usuario, sdr, ideal, parcial o parche');
        url += '/usuarios/xxx';
    }

    return url;
  }

}
