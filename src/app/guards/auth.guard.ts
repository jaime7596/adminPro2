import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private usuarioService: UsuarioService,
              private router : Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      console.log('Estan en el GUARD');
      
      return this.usuarioService.validarToken()
        .pipe(
          tap( isAuth => {
            console.log(isAuth);
            
            if(!isAuth) {
              console.log('Salio');
              this.router.navigateByUrl('/login');
            }
          })
        );
  }
}
