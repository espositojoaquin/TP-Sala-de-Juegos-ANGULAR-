import { Component, OnInit } from '@angular/core';
import { JuegoTateti } from '../../clases/juego-tateti';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../servicios/auth.service';
import { DataService } from '../../servicios/data.service';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {
  nuevoJuego: JuegoTateti;
  enJuego: boolean = false;
  turnoJugador = false;
  cuentaMarcas: number = 0;
  imgCruz: string = '../../../assets/imagenes/cruz.png'
  imgCirculo: string = '../../../assets/imagenes/circulo.png'
  save: boolean = false;
  user: any;
  contadorGanadas: number = 0;
  contadorPerdidas: number = 0;
  empate:boolean = false;
  desGuar:boolean = false;
  claseTateti = "row tablero ld ld-slide-ttb-in";


  constructor(private toastr: ToastrService, private authService: AuthService,
    private dataService: DataService) {
    this.nuevoJuego = new JuegoTateti();
  }

  generarJugada() {
    let row = Math.floor(Math.random() * 3);
    let col = Math.floor(Math.random() * 3);
    this.marcarJugada(row, col, true);
    this.save = true;
  }


  marcarJugada(row: number, column: number, jugadaGenerada: boolean) {

          if(this.cuentaMarcas < 9)
          {

            if (jugadaGenerada) {
              if (this.nuevoJuego.tablero[row][column] != "" && this.cuentaMarcas < 9) {
                this.generarJugada()
              } else {
                this.cuentaMarcas++;
                this.nuevoJuego.tablero[row][column] = this.imgCruz;
                this.turnoJugador = true;
                if(this.nuevoJuego.verificarTresEnLinea(this.imgCruz)){
                  if(!this.nuevoJuego.verificar()){
                    this.toastr.error("Perdedor..", "Mejor suerte la próxima");
                    this.contadorPerdidas++;
                    setTimeout(() => {
                      this.claseTateti = "row tablero ld ld-slide-ttb-out infinite"
                      this.enJuego = false;

                    }, 1000);

                  }
                }
              }
            } else {
              if (this.nuevoJuego.tablero[row][column] == "") {
                this.cuentaMarcas++;
                this.nuevoJuego.tablero[row][column] = this.imgCirculo;
                this.turnoJugador = false;
                if (!this.nuevoJuego.verificarTresEnLinea(this.imgCirculo)) {
                  setTimeout(() => {
                    this.generarJugada();
                  }, 400);
                } else if(this.nuevoJuego.verificarTresEnLinea(this.imgCirculo)) {

                  this.toastr.success("Felicitaciones!", "Ganaste esta vez");
                    this.contadorGanadas++;
                    this.nuevoJuego.gano = true;
                    setTimeout(() => {
                      this.enJuego = false;
                      this.claseTateti = "row tablero ld ld-slide-ttb-out" 
                      
                    }, 1000);
                    

                }
          }
        }
      }
      else
      {
        this.toastr.warning("Empate", "Estuvo parejo");
        setTimeout(() => {
          this.claseTateti = "row tablero ld ld-slide-ttb-out infinite"
          this.enJuego = false;
          this.nuevoJuego.juegoTerminado=true;
          this.empate=true;

        }, 1000);

      }
  }

  nuevo() {
    this.claseTateti = "row tablero ld ld-slide-ttb-in";
    this.empate = false;
    this.desGuar = false;
    this.save = false;
    this.nuevoJuego.juegoTerminado = false;
    this.nuevoJuego.reset();
    this.enJuego = true;
    this.turnoJugador = true;
    this.cuentaMarcas = 0;
  }

  guardar(){
    if(this.nuevoJuego.gano)
    {
      this.user.puntajes[5]['tatetiG'] += 1;
      console.log("llega gano");

    }
    else
    { 
      if(this.empate)
      {
        this.user.puntajes[14]['tatetiE'] += 1;
        console.log("llega empate");
        

      }
      else
      {
        this.user.puntajes[12]['tatetiP'] += 1;
        console.log("llega perdio");
        

      }

      
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
