import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuarios.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})

export class UsuariosComponent implements OnInit, OnDestroy {
  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public desde: number = 0;
  public imgSubs: Subscription
  public cargando: boolean = true;
  constructor(private usuarioService: UsuarioService,
              private busquedaService: BusquedasService,
              private modalImagenService: ModalImagenService,
              private router: Router ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    ).subscribe(img => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.desde)
    .subscribe( ({ total, usuarios}) => {
      this.totalUsuarios = total;
      if(usuarios.length !==0 ){
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      }
    }, (error) => {
      Swal.fire(
        'Tu subscripción a finalizado',
        'Para renovar vista nuestra pagina ofical Mint.com.mx',
        'error'
      );
      this.router.navigateByUrl('/login');
    });
  }

  cambiarPagina(valor: number) {
    this.desde = valor;
    if( this.desde < 0){
      this.desde = 0;
    } else if ( this.desde = this.totalUsuarios) {
      this.desde -= valor; 
    }
    this.cargarUsuarios()
  }

  buscar(termino: string){
    if (termino.length === 0){
      return this.usuarios = this.usuariosTemp;
    }
    this.busquedaService.buscar('usuarios', termino).subscribe( resp => {
      this.usuarios = resp;
    });
  }

  eliminarUsuario(usuario: Usuario) {
    if (usuario.uid === this.usuarioService.uid){
      Swal.fire('Error', 'No puede borrar su Usuario', 'error');
      return;
    }
    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta a punto de borrar a ${usuario.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioService.borrarUsuario(usuario.uid).subscribe( resp => {

          Swal.fire({
            title: 'Usuario Borrado',
            icon: 'success',
          });
          this.cargarUsuarios();

        });
      }
    });
  }

  cambiarRole(usuario: Usuario) {
    this.usuarioService.guardarPerfil(usuario).subscribe( resp => {
      console.log(resp);
      
    });
  }

  abrirModal(usuario: Usuario) {
    console.log(usuario);
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img);  
  }
  ngOnDestroy() {
    this.imgSubs.unsubscribe();
  }
}
