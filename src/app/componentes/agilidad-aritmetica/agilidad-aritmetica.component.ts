import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../servicios/auth.service';
import { DataService } from '../../servicios/data.service';


@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {

  nuevoJuego: JuegoAgilidad;
  enJuego: boolean;
  tiempo: number;
  repetidor: any;
  user: any;
  btnGuardar:Boolean = true;
  desGuar:boolean = false;


  constructor(private toastr: ToastrService, private authService: AuthService,
    private dataService: DataService) {
    this.enJuego = false;
    this.tiempo = 5;
    this.nuevoJuego = new JuegoAgilidad();
  }

  setInputNumeroIngresado(){
    setTimeout(()=>{
      (<HTMLInputElement>document.getElementById("input-numero-ingresado")).value = null;
      document.getElementById("input-numero-ingresado").focus();
    }, 1);
  }

  nuevo(): void {
    this.desGuar= false;
    this.btnGuardar=true;
    this.nuevoJuego.reset();
    this.setInputNumeroIngresado();
    this.enJuego = true;
    this.nuevoJuego.generarOperacion();
    this.repetidor = setInterval(() => {
      this.tiempo--;
      if (this.tiempo == 0) {
        clearInterval(this.repetidor);
        this.verificar();
        this.tiempo = 6;
      }
    }, 900);
  }

  verificar() {
    if (this.nuevoJuego.verificar()) {
      this.mostrarMensaje("Ganaste un porrón", true);
    } else {
      this.mostrarMensaje("Andá a la escuela", false);
    }
    this.enJuego = false;
    this.btnGuardar = false;
  }

  mostrarMensaje(mensaje: string = "este es el msg", ganador: boolean = false) {
    if (ganador) {
      this.toastr.success(mensaje, "¡Felicitaciones!");
    } else {
      this.toastr.error(mensaje, "Seguí participando");
    }
  }

  guardar(){
    if(this.nuevoJuego.gano)
    {
      this.user.puntajes[1]['agilidadG'] += 1;
     
    }
    else
    {
      this.user.puntajes[8]['agilidadP'] += 1;
     
    }

    this.dataService.updatePuntaje(this.user.uid, this.user.puntajes)
      .then(() => {
        this.toastr.success("Puntos guardados");
        this.desGuar=true;
      })
      .catch(err => {
        this.toastr.error("Al guardar: " + err.message, "Error");
      })
      
  }

  getCurrentUser() {
    var uid="0";
     this.authService.getUserUid().then(res =>{
       uid = res.toString();
       this.dataService.getUserByUid(uid)
          .subscribe(res => {
            this.user = res;
          })
     }).catch(res =>{
      uid = res.toString();
      console.log("Sin Usuario");
     });
     
  }

  ngOnInit() {
    this.getCurrentUser();
  }

}
