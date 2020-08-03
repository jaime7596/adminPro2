import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getUsers()
      .then( users => {
        console.log(users);
        
      })
    // const promesa = new Promise((resolve, reject) => {
    //   if(false) {
    //     resolve('Hola Mundo');
    //   } else {
    //     reject('Algo salio mal');
    //   }

    // });

    // promesa
    //   .then(mensaje => {
    //     console.log(mensaje);
    //   })
    //   .catch(error => {
    //     console.log(error);
        
    //   });

    //   console.log('Fin del init');
      

  }

  getUsers() {
    const promesa = new Promise(resolve => {
      fetch('https://reqres.in/api/users')
        .then(resp => resp.json())
        .then(body => resolve(body.data));
      });
    return promesa;
    }

}
