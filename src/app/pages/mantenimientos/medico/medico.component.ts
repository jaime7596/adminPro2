import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { Hospital } from '../../../models/hospital.model';
import { MedicosService } from '../../../services/medicos.service';
import { Medico } from '../../../models/medico.model';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {
  public hospitales: Hospital[] = [];
  public medicoForm: FormGroup;
  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder,
              private hospitalService :HospitalService,
              private medicoService: MedicosService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(({id}) => {
      console.log(id);
      
      this.cargarMedico(id)
    })
    this.cargarHospitales();
    this.medicoForm = this.fb.group({
      nombre: ['Jaime', Validators.required],
      hospital: ['', Validators.required]
    })
    this.medicoForm.get('hospital').valueChanges.subscribe(hospitalId => {
      console.log(hospitalId);
      this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId); 
      console.log(this.hospitalSeleccionado);
      
    })
  }

  cargarMedico(id: string){
    if(id === 'nuevo'){
      return
    }
    this.medicoService.obtenerMedicoPorId(id).pipe(delay(100)).subscribe( resp => {
      if (!resp.medico) {
        this.router.navigateByUrl(`/dashboard/medicos`)
      }
      const {nombre, hospital: {_id }} = resp.medico;
      this.medicoSeleccionado = resp.medico;
      this.medicoForm.setValue({nombre, hospital: {_id } })
      
    })
  }


  guardarMedico(){
    if (this.medicoSeleccionado) {
      // Actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico( data).subscribe( resp => {
        Swal.fire({
          title: 'Medico Actualizado',
          icon: 'success',
        });
      })



    } else {
      // Crear
      console.log(this.medicoForm.value);
      this.medicoService.crearMedico(this.medicoForm.value).subscribe((resp: any) => {
        console.log(resp);
        Swal.fire({
          title: 'Medico Guardado',
          icon: 'success',
        });
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
      })
    }
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales().subscribe((hospitales: Hospital[]) => {
      this.hospitales = hospitales
      console.log(this.hospitales);



    })
  }

}
