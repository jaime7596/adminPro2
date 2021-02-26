import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit, OnDestroy {
  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(  private hospitalService: HospitalService,
                private modalImagenService: ModalImagenService,
                private busquedaService: BusquedasService
              ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
    
  }              

  ngOnInit() {
    this.cargarHospitales();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    ).subscribe(img => this.cargarHospitales());
    
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales().subscribe( hospitales => {
      console.log(hospitales);
      this.cargando = false;
      this.hospitales = hospitales;
      
    });
  }

  guardarCambios(hospital: Hospital) {
    console.log(hospital);
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre).subscribe( resp => {
      Swal.fire('Actualizado', hospital.nombre, 'success')
    })
  }

  eliminarCambios(hospital: Hospital) {
    console.log(hospital);
    this.hospitalService.eliminararHospital(hospital._id).subscribe( resp => {
      Swal.fire('Eliminado', hospital.nombre, 'success');
      this.cargarHospitales();
    })
  }

  buscar(termino: string){
    if (termino.length === 0){
      return this.cargarHospitales();
    }
    this.busquedaService.buscar('hospitales', termino).subscribe( resp => {
      this.hospitales = resp;
    });
  }




  async abrirSweetAlert() {

    const {value = ''} = await Swal.fire<string>({
      text: 'Ingrese nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del Hospital',
    });

    console.log(value);
    if(value.trim().length > 0){
      this.hospitalService.crearHospital(value).subscribe( resp => {
        this.cargarHospitales()
      })
    }

  }

  abriModal(hospital: Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }

}
