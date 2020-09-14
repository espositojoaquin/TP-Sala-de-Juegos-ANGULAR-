import { Component, OnInit } from '@angular/core';
import { JuegoPiedraPapelTijera } from '../../clases/juego-piedra-papel-tijera';
import { ToastrService } from 'ngx-toastr';
/*import { AuthService } from 'src/app/servicios/auth.service';
import { DataService } from 'src/app/servicios/data.service';*/

@Component({
  selector: 'app-piedra-papel-tijera',
  templateUrl: './piedra-papel-tijera.component.html',
  styleUrls: ['./piedra-papel-tijera.component.css']
})
export class PiedraPapelTijeraComponent implements OnInit {
  nuevoJuego: JuegoPiedraPapelTijera;
  repetidor: any;
  stop: boolean = false;
  enJuego: boolean = false;
  imagenJugada: string = '../../../assets/imagenes/piedra.png';
  imagenJugadaUsario: string = '../../../assets/imagenes/tijera.png';
  jugadaSeleccionada: number;
  contadorGanadas: number = 0;
  contadorPerdidas: number = 0;
  user: any;
  save: boolean = false;

  constructor(
    private toastr: ToastrService,
   /* private authService: AuthService,
    private dataService: DataService*/) {
    this.nuevoJuego = new JuegoPiedraPapelTijera();
  }

  nuevo() {
    this.save = false;
    this.stop = false;
    this.enJuego = true;
    this.repetidor = setInterval(() => {
      this.nuevoJuego.generarJugada();
      this.setImagenes();
      if (this.stop) {
        this.nuevoJuego.jugadaUsuario = this.jugadaSeleccionada;
        this.setImagenes();
        clearInterval(this.repetidor);
        this.verificar();
        this.save = true;
      }
    }, 80);
  }

  detener(jugada: number) {
    this.jugadaSeleccionada = jugada;
    this.stop = true;
  }

  verificar() {
    this.nuevoJuego.verificarJugada();
    this.mostrarMensaje();
    this.enJuego = false;
  }

  /**
   *  -1 (usuario pierde)
   *   0 (empate)
   *   1 (usuario gana)
   */
  mostrarMensaje() {
    switch (this.nuevoJuego.resultado) {
      case -1:
        this.toastr.error("Me dijeron que eras bueno, pero se esquivocaron...,Perdiste");
        this.contadorPerdidas++;
        break;
      case 0:
        this.toastr.warning("Dejá de copiarme...,Empate");
        break;
      case 1:
        this.toastr.success("Ja, Tuviste suerte esta vez...,Ganaste");
        this.contadorGanadas++;
        break;
    }
  }

  setImagenes() {
    switch (this.nuevoJuego.jugada) {
      case 1:
        this.imagenJugada = '../../../assets/imagenes/piedra.png';
        break;
      case 2:
        this.imagenJugada = '../../../assets/imagenes/papel.png';
        break;
      case 3:
        this.imagenJugada = '../../../assets/imagenes/tijera.png';
        break;
    }
    switch (this.nuevoJuego.jugadaUsuario) {
      case 0:
        this.imagenJugadaUsario = '../../../assets/imagenes/question.png';
        break;
      case 1:
        this.imagenJugadaUsario = '../../../assets/imagenes/piedra.png';
        break;
      case 2:
        this.imagenJugadaUsario = '../../../assets/imagenes/papel.png';
        break;
      case 3:
        this.imagenJugadaUsario = '../../../assets/imagenes/tijera.png';
        break;
    }
  }

  guardar(){
    var result = this.contadorGanadas - this.contadorPerdidas;
    this.user.puntajes['ppt'] += result;
    /*this.dataService.updatePuntaje(this.user.uid, this.user.puntajes)
      .then(() => {
        this.toastr.success("Puntos guardados")
      })
      .catch(err => {
        this.toastr.error("Al guardar: " + err.message, "Error");
      })*/
  }

  getCurrentUser() {
   /* let user = this.authService.getCurrentUser();
    this.dataService.getUserByUid(user.uid)
      .subscribe(res => {
        this.user = res;
      })*/
  }

  ngOnInit() {
    this.getCurrentUser();
  }

}
