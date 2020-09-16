import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login.interface';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const gapi: any;



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiKey = environment.apiKey;
  public auth2: any;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
                this.googleInit();
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

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/');
      })
    });
  }


  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token' || '');
    return this.http.get(`${this.apiKey}/login/renew`, {
      headers : {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
      map(resp => true),
      catchError(error => of(false))
    )
  }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${this.apiKey}/usuarios`, formData)
                .pipe(
                  tap((resp: any) => localStorage.setItem('token', resp.token))
                );
  }

  login(formData: LoginForm){
    return this.http.post(`${this.apiKey}/login`, formData)
                .pipe(
                  tap((resp: any) => localStorage.setItem('token', resp.token))
                );
  }
  loginGoogle(token){
    return this.http.post(`${this.apiKey}/login/google`, {token})
                .pipe(
                  tap((resp: any) => localStorage.setItem('token', resp.token))
                );
  }
}
