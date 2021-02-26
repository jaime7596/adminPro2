import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Medico } from '../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  public apiKey = environment.apiKey;
  constructor(
    private http: HttpClient
    ) {}

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

  cargarMedicos () {
    return this.http.get(`${this.apiKey}/medicos`, this.headers )
      .pipe(
        map( (resp: any ) => resp.medicos)
      );
  }
  obtenerMedicoPorId (id) {
    return this.http.get(`${this.apiKey}/medicos/${id}`, this.headers )
      .pipe(
        map( (resp: any ) => resp.medico)
      );
  }

  crearMedico(medico: {nombre: string, hospital: string}) {
    return this.http.post(`${this.apiKey}/medicos`, medico, this.headers)
  }

  actualizarMedico(medico: Medico) {
    return this.http.put(`${this.apiKey}/medicos/${medico._id}`, medico, this.headers)
  }

  eliminararMedico(_id: string) {
    return this.http.delete(`${this.apiKey}/medicos/${_id}`, this.headers)
  }
}
