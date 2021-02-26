import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Hospital } from '../models/hospital.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
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

  cargarHospitales () {
    return this.http.get(`${this.apiKey}/hospitales`, this.headers )
      .pipe(
        map( (resp: {ok: boolean, hospitales: Hospital[]}) => 
          resp.hospitales
          )
      );
  }

  crearHospital(nombre: string) {
    return this.http.post(`${this.apiKey}/hospitales`, {nombre}, this.headers)
  }

  actualizarHospital(_id: string , nombre: string) {
    return this.http.put(`${this.apiKey}/hospitales/${_id}`, {nombre}, this.headers)
  }

  eliminararHospital(_id: string) {
    return this.http.delete(`${this.apiKey}/hospitales/${_id}`, this.headers)
  }

  
}
