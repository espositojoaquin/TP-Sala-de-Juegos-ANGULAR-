import { Component, OnInit } from '@angular/core';
import { JuegoServiceService } from '../../servicios/juego-service.service';
import { DataService } from '../../servicios/data.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {
  public listadoParaCompartir: Array<any>;
   miServicioJuego:JuegoServiceService
   //listado:any;
  constructor(servicioJuego:JuegoServiceService,private data:DataService) {
    this.miServicioJuego = servicioJuego;
    
  }
  
  ngOnInit() {
    this.data.getUsers().subscribe(res => {
      console.info("res", res);
      this.listadoParaCompartir = res;
    })
  }

  /*llamaService(){
    console.log("llamaService");
    this.listadoParaCompartir= this.miServicioJuego.listar();
  }

  llamaServicePromesa(){
    console.log("llamaServicePromesa");
    this.miServicioJuego.listarPromesa().then((listado) => {
        this.listadoParaCompartir = listado;
    });
  }*/
}
