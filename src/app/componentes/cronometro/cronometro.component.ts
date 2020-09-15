import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.css']
})
export class CronometroComponent implements OnInit {

  tiempoRestante: Date = null;
  timer: any = null;

  @Input()
  set tiempoMinutos(tiempoMinutos) {
    this._tiempoMinutos = tiempoMinutos;
  }
  _tiempoMinutos: number;

  @Input()
  set juegoIniciado(juegoIniciado) {
    this._juegoIniciado = juegoIniciado;
    if (this._juegoIniciado) {
      this.tiempoRestante = new Date(this.tiempoRestante.setMinutes(
        this.tiempoRestante.getMinutes() + this._tiempoMinutos
      ));
      this.iniciar();
    } else {
      this.detener();
    }
  }
  _juegoIniciado: boolean;

  @Output()
  tiempoTerminado = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    this.detener();
  }

  iniciar() {
    this.timer = setInterval(() => {
      if (this.tiempoRestante.getMinutes() === 0 && this.tiempoRestante.getSeconds() === 0) {
        this.detener();
      } else {
        this.tiempoRestante = new Date(this.tiempoRestante.setSeconds(this.tiempoRestante.getSeconds() - 1));
      }
    }, 1000);
  }

  detener() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.tiempoRestante = new Date(0, 0, 0, 0, 0, 0, 0);
    this.tiempoTerminado.emit();

  }

}
