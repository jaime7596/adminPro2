import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BusquedasService } from '../../services/busquedas.service';
import { Usuario } from '../../models/usuarios.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styles: [
  ]
})
export class BusquedasComponent implements OnInit {
  public usuarios: Usuario[] = [];
  public hospitales: Hospital[] = [];
  public medicos: Medico[] = [];

  constructor(
    private route: ActivatedRoute,
    private busquedasService: BusquedasService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      console.log(params);
      this.busquedaGlobal(params.termino)
    })
  }

  busquedaGlobal(termino){
    console.log('entro');
    
    this.busquedasService.busquedaGlobal(termino).subscribe((resp: any) => {
      console.log(resp);
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
      this.usuarios = resp.usuarios;
    }) 
  }


}
