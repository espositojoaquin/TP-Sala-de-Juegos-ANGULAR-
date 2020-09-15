import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { jsonpFactory } from '@angular/http/src/http_module';

@Component({
  selector: 'app-memo-test',
  templateUrl: './memo-test.component.html',
  styleUrls: ['./memo-test.component.css']
})
export class MemoTestComponent implements OnInit {

  constructor(private toast:ToastrService) { }


  juegoIniciado:boolean;
  mostrarAlerta = false;
  tiempo:number;
  cantidad:number;
  niveles = [
    {
      id: 0,
      nombre: 'Facil',
      tiempoMinutos: 2,
      cantidadFichas: 10
    },
    {
      id: 1,
      nombre: 'Medio',
      tiempoMinutos: 3,
      cantidadFichas: 15
    },
    {
      id: 2,
      nombre: 'Difícil',
      tiempoMinutos: 4,
      cantidadFichas: 20
    },
    {
      id: 3,
      nombre: 'Extremo',
      tiempoMinutos: 5,
      cantidadFichas: 25
    }
  ];
  nombre: string = null;
  nivelSeleccionado:any= null;

  ngOnInit() {
    this.juegoIniciado = false;
  }

  iniciar() {
    switch(this.nivelSeleccionado)
    {
      case'Facil':
      this.tiempo = 2;
      this.cantidad = 10;
      break;
      case'Medio':
      this.tiempo = 3;
      this.cantidad = 15;

      break;
      case'Difícil':
      this.tiempo = 4;
      this.cantidad = 20;

      break;
      case'Extremo':
      this.tiempo = 5;
      this.cantidad = 25;
      break;
    }
    console.log( JSON.stringify(this.nivelSeleccionado) );
    this.juegoIniciado = true;
    this.mostrarAlerta = true;
    setTimeout(function() {
      this.mostrarAlerta = false;
    }.bind(this), 2000);
  }

  detener() {
    this.juegoIniciado = false;
    this.nombre = null;
    this.nivelSeleccionado = null;
  }
  perdio()
  {
    if(this.juegoIniciado==true)
    {
      this.toast.error("Espero que la proxima tengas mas suerte, Perdiste!!!");

    }
    this.detener();
  }
  gano()
  {
    this.toast.success("Wow eres todo un Genio,Ganaste");

    this.detener();
  }


}
