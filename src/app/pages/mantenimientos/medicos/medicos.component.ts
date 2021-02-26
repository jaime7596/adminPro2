import { Component, OnDestroy, OnInit } from '@angular/core';
import { Medico } from '../../../models/medico.model';
import { MedicosService } from '../../../services/medicos.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {
  public cargando: boolean = true;
  public medicos: Medico[]= [];
  public imgSubs: Subscription;
  constructor( private medicosService: MedicosService,
               private busquedaService: BusquedasService,
               private modalImagenService: ModalImagenService
              ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
    
  }  

  ngOnInit(): void {
    this.cargarMedicos()
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    ).subscribe(img => this.cargarMedicos());
  }

  cargarMedicos() {
    this.cargando = true;
    this.medicosService.cargarMedicos().subscribe( medicos => {
      this.medicos = medicos
      this.cargando = false;
    })
  }

  abriModal(medico: Medico){
    this.modalImagenService.abrirModal('medicos', medico._id, medico.img);
  }

  buscar(termino: string){
    if (termino.length === 0){
      return this.cargarMedicos();
    }
    this.busquedaService.buscar('hospitales', termino).subscribe( resp => {
      this.medicos = resp;
    });
  }

  borrarMedico(medico){
    Swal.fire({
      title: '¿Borrar Medico?',
      text: `Esta a punto de borrar a ${medico.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si borrarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.medicosService.eliminararMedico(medico.uid).subscribe( resp => {

          Swal.fire({
            title: 'Medico Borrado',
            icon: 'success',
          });
          this.cargarMedicos();

        });
      }
    });
  }
  

}
