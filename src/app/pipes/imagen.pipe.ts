import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';
const apikey = environment.apiKey
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: 'usuarios' | 'medicos' | 'hospitales'): string {

  if(!img){
      return `${apikey}/upload/usuarios/no-image`;
  }
  if(img.includes('https')){
      return img;
  }
  if (img) {
      return `${apikey}/upload/usuarios/${img}`;
  } else {
      return `${apikey}/upload/usuarios/no-image`;
  }
  }

}
