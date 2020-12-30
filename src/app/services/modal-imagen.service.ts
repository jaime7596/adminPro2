import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
const apikey = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {
  private _ocultarModal: boolean = true;
  public tipo:  'usuarios'|'medicos'|'hospitales'
  public id: string 
  public img: string 
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  get ocultarModal() {
    return this._ocultarModal;
  }
  
  abrirModal( tipo: 'usuarios'|'medicos'|'hospitales', id: string, img:string = 'no-img') {
    this._ocultarModal = false;
    this.tipo = tipo,
    this.id = id;
    
    if(img.includes('https') ){
      this.img = img;
    }else {
      this.img = `${apikey}/upload/${tipo}/${img}` 
    }
    
  }
  
  cerrarModal() {
    return this._ocultarModal = true;
  }
  constructor() { }
}
