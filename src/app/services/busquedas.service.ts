import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuarios.model';
import { Hospital } from '../models/hospital.model';
import { Medico } from '../models/medico.model';

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
  private tranformarHospitales(resultados: any): Hospital[] {
    return resultados
  }
  private tranformarMedicos(resultados: any): Medico[] {
    return resultados
  }

  busquedaGlobal(termino: string){ 
    return this.http.get(`${this.apiKey}/busquedas/todo/${termino}`, this.headers );
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

            case 'hospitales':
              return this.tranformarHospitales(resp.resultados);

            case 'medicos':
              return this.tranformarMedicos(resp.resultados);

            default:
              return[];
          }
        })
      )
  }
  

}


