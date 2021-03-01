import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuarios.model';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';

declare const gapi: any;



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiKey = environment.apiKey;
  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
                this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers : {
        'x-token': this.token
      }
    }
  } 

  googleInit(){
    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '913943888019-4j8v775cfhr3i80bf9dl1o913g2jpef8.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    });
  }

  guardarLocalStorage(token: string, menu: any) {
    localStorage.setItem('token', token);
    // localStorage.setItem('menu', JSON.stringify(menu));
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/');
      });
    });
  }


  validarToken(): Observable<boolean> {
    return this.http.get(`${this.apiKey}/login/renew`, {
      headers : {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        const { email, google, nombre, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario(nombre, email, '' , img, google, role, uid);
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${this.apiKey}/usuarios`, formData)
                .pipe(
                  tap((resp: any) => {
                    localStorage.setItem('token', resp.token);
                  })
                );
  }

  actualizarPerfil(data: { email: string, nombre: string, role: string }) {
    data = {
      ...data,
      role: this.usuario.role
    }
    return this.http.put(`${this.apiKey}/usuarios/${this.uid}`, data, {
      headers : {
        'x-token': this.token
      }
    });
  }

  login(formData: LoginForm){
    return this.http.post(`${this.apiKey}/login`, formData)
                .pipe(
                  tap((resp: any) => { 
                    console.log(resp);
                    // const { email, google, nombre, role, img = '', uid } = resp.usuario;
                    // this.usuario = new Usuario(nombre, email, '' , img, google, role, uid);
                     localStorage.setItem('token', resp.token);
                  })

                );
  }

  loginGoogle(token){
    return this.http.post(`${this.apiKey}/login/google`, {token})
                .pipe(
                  tap((resp: any) => localStorage.setItem('token', resp.token))
                );
  }

  cargarUsuarios (desde: number = 0) {
    return this.http.get<CargarUsuario>(`${this.apiKey}/usuarios?desde=${desde}`, this.headers )
      .pipe(
        map( resp => {
          const usuarios = resp.usuarios.map(
            user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
            );

          return {
            total: resp.total,
            usuarios
          }
        })
      );
  }

  borrarUsuario(uid: string) {
    console.log('Eliminado');
    return this.http.delete(`${this.apiKey}/usuarios/${uid}`, {
      headers : {
        'x-token': this.token
      }
    });
  }

  guardarPerfil(usuario: Usuario) {
    // data = {
    //   ...data,
    //   role: this.usuario.role
    // }
    return this.http.put(`${this.apiKey}/usuarios/${usuario.uid}`, usuario, this.headers);
  }
}
