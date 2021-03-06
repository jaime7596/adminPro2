import { environment } from '../../environments/environment';

const apikey = environment.apiKey;
export class Usuario {
    constructor(        
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string
    ) {}

    get imagenUrl(){
        if(!this.img){
            return `${apikey}/upload/usuarios/no-image`;
        }
        if(this.img.includes('https')){
            return this.img;
        }
        if (this.img) {
            return `${apikey}/upload/usuarios/${this.img}`;
        } else {
            return `${apikey}/upload/usuarios/no-image`;
        }
    }
}