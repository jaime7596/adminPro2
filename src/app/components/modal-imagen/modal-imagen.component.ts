import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileuploadService } from '../../services/fileupload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent {
  public imagenSubir;
 
  public imgTemp: any = null;
  
  constructor(public modalImagenService: ModalImagenService,
              public fileUploadService: FileuploadService
              ) { }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImagenService.cerrarModal();
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;
    if (!file) { return this.imgTemp = null; }
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;
    

    this.fileUploadService.actualizarFoto(this.imagenSubir, tipo, id)
    .then(resp => {
      Swal.fire('Guardado', 'Imagen Actualizada', 'success');
      this.modalImagenService.nuevaImagen.emit(resp);
      this.cerrarModal();
    })
    .catch(err => {
      Swal.fire('Error', err.error.msg, 'error');
    });
  }  
}
