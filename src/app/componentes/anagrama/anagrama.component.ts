import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../servicios/auth.service';
import { DataService } from '../../servicios/data.service';


@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
  nuevoJuego: JuegoAnagrama;
  enJuego: boolean = false;
  ocultarVerificar: boolean = false;
  user: any;
  save: boolean = false;
  desGuar:boolean = false;

  constructor(private toastr: ToastrService, private authService: AuthService,
    private dataService: DataService) {
    this.nuevoJuego = new JuegoAnagrama();
  }

  keys(): Array<string> {
    return Object.keys(this.nuevoJuego.diccinario);
  }

  palabraSeleccionada(key: string) {
    this.nuevoJuego.reset();
    this.desGuar = false;
    this.save = false;
    this.nuevoJuego.palabraSeleccionada = this.keys().find((id) => id == key);
    this.enJuego = true;
  }

  verificarUsr() {
    this.ocultarVerificar = true;
    this.nuevoJuego.verificar();
    this.mostrarMensaje();
    this.save=true;
  }

  mostrarMensaje() {

    if (this.nuevoJuego.gano) {
      this.toastr.success("Lo lograste", "Bravo!");
      //this.save = true;
    } else {
        this.toastr.error(this.nuevoJuego.palabraIngresada + ", no es anagrama de " + this.nuevoJuego.palabraSeleccionada,
        "Seguí participando");
      //  this.save = false;
    }
    this.enJuego = false;
    this.ocultarVerificar = false;
    this.nuevoJuego.palabraIngresada="";
    this.nuevoJuego.palabraSeleccionada="";
   // this.nuevoJuego.reset();

  }

  guardar(){
    if(this.nuevoJuego.gano)
    {
      this.user.puntajes[2]['anagramaG'] += 1;

    }
    else
    {
      this.user.puntajes[9]['anagramaP'] += 1;
       
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
