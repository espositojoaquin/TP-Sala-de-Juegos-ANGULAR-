
import { Component, OnInit } from '@angular/core';
import { JuegoAdivina } from '../../clases/juego-adivina';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../servicios/auth.service';
import { DataService } from '../../servicios/data.service';


@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {

  nuevoJuego: JuegoAdivina;
  mensajes: string;
  contador: number;
  ocultarVerificar: boolean;
  user: any;
  desGuar:boolean = false;
  apdes = "ld ld-jump-alt-in"
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private dataService: DataService) {
    this.nuevoJuego = new JuegoAdivina();
    this.ocultarVerificar = false;
  }

  setInputNumeroIngresado() {
    setTimeout(() => {
      (<HTMLInputElement>document.getElementById("input-numero-ingresado")).value = null;
      document.getElementById("input-numero-ingresado").focus();
    }, 1);
  }

  generarNumeroUsr() {
    this.nuevoJuego.generarNumero();
    this.contador = 0;
    this.desGuar = false;
    this.ocultarVerificar=false;
    this.setInputNumeroIngresado();
  }
  verificarNum(){
    if(this.nuevoJuego.numeroIngresado > 0)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  verificarUsr() {
    if(this.verificarNum())
    {
      this.contador++;
      this.ocultarVerificar = true;
      console.info("resultado: ", this.nuevoJuego.gano);
      if (this.nuevoJuego.verificar()) {
        this.mostrarMensaje("Lo adivinaste", true);
        this.nuevoJuego.numeroSecreto = 0;
      }
      else {
        if(this.contador<6)
        {
          let mensaje: string;
          switch (this.contador) {
            case 1:
              mensaje = "Primer intento fallido, vamos de nuevo";
              break;
            case 2:
              mensaje = "No, te estarás Acercando???";
              break;
            case 3:
              mensaje = "No es, yo creí que la tercera era la vencida";
              break;
            case 4:
              mensaje = "No era el " + this.nuevoJuego.numeroIngresado;
              break;
            case 5:
              mensaje = "Te queda solo 1 intento";
              break;
            case 6:
              mensaje = "Afortunado en el amor";
              break;
    
            default:
              mensaje = "Ya le erraste " + this.contador + " veces";
              break;
          }
          this.mostrarMensaje("#" + this.contador + " " + mensaje + " - Ayuda: " + this.nuevoJuego.retornarAyuda());
  
        }
        else
        {  
           this.apdes = "jump-alt-out";
           this.toastr.error("Mejor suerte la próxima...");
           this.nuevoJuego.gano=true;
           this.nuevoJuego.numeroSecreto =0;
        }
      }
      console.info("resultado: ", this.nuevoJuego.gano);

    }
    else
    {
      this.toastr.error("Ingrese un número","Error");

    }
  }

  mostrarMensaje(mensaje: string = "este es el msg", ganador: boolean = false) {
    this.mensajes = mensaje;
    if (ganador) {
      this.apdes = "jump-alt-out";
      this.toastr.success(mensaje, "¡Felicitaciones!");
    } else {
      this.toastr.error(mensaje, "Seguí participando");
      this.setInputNumeroIngresado();
    }
    this.ocultarVerificar = false;
    this.nuevoJuego.numeroIngresado = 0;
  }

  guardar(){
    if(this.contador<6)
    {
      this.user.puntajes[0]['adivinaG'] += 1;

    }
    else
    {
      this.user.puntajes[7]['adivinaP'] += 1;
       
    }
    console.info(this.user.puntajes);
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
