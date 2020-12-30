import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {
  public apiKey = environment.apiKey;
  constructor(private http: HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers : {
        'x-token': this.token
      }
    }
  }

  private tranformarUsuarios(resultados: any): Usuario[] {
    return resultados.pipe( 
      map(
        (user:any) => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
      )
    );
  }

  buscar(
    tipo: 'usuarios'| 'medicos'| 'hospitales',
    termino: string
    ) {
      return this.http.get<CargarUsuario>(`${this.apiKey}/todo/coleccion/${tipo}/${termino}`, this.headers )
      .pipe(
        map((resp:any) => {
          switch (tipo) {
            case 'usuarios':
              return this.tranformarUsuarios(resp.resultados);

            default:
              break;
          }
        })
      )
  }
  

}


