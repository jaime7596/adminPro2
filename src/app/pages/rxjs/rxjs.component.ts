import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, interval, Subscription} from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';
import { RegisterComponent } from '../../auth/register/register.component';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {
  public intervalSubs: Subscription;

  constructor() {


    this.retornaIntervalo().subscribe(resp => console.log(resp))


    // this.returnObservable().pipe(
    //   retry()
    // ).subscribe( 
    //   valor => console.log('Subs', valor),
    //   error => console.warn('Error', error),
    //   () => console.log('Obs Terminado')
    //   );

   }


  ngOnDestroy() {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    return interval(1000)
                        .pipe(
                          take(4),
                          map( valor => valor + 1),
                          filter(valor => (valor % 2 === 0) ? true : false)
                        );

  }

  returnObservable(): Observable<number>{
    let i = -1;

    const obs$ = new Observable<number>(observer => {
      const intervalo = setInterval( () => {
        console.log('Tic-Tok');
        i++;
        observer.next(i);
        if( i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }
      }, 1000);
    });
    return obs$;
  }

}
