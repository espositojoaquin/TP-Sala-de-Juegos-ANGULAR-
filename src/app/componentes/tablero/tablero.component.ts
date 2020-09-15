import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { ITarjeta } from '../../clases/interface/ITarjeta';
import { TableroService } from '../../servicios/tablero.service';



@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css'],
  animations: [
    trigger('tarjetasAnimation', [
      state('in', style({opacity: 1, transform: 'translateX(0)'})),
      transition('void <=> *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.5s ease-in')
      ])
    ])
  ]
})

export class TableroComponent implements OnInit {

  @Input()
  set cantidadFichas(cantidadFichas) {
    this._cantidadFichas = cantidadFichas;
    this.tarjetasSeleccionadas = this.actions.getTarjetas(this._cantidadFichas);
  }
  _cantidadFichas: number;

  tarjetasSeleccionadas: Array<ITarjeta>;

  constructor(private actions: TableroService) { }

  ngOnInit() {
  }

  @Output()
  gano = new EventEmitter<any>();

  validate()
   {
     var a = false;
     this.tarjetasSeleccionadas.forEach(tarjeta => {

      if(tarjeta.visible!=true)
      {
        a = true;
      }

     });

     if(a==false)
     {
       this.gano.emit();
     }

     return a;
   }

}
