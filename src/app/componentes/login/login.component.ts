import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Subscription} from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { AuthService  } from "../../servicios/auth.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private subscription: Subscription;
  email = '';
  clave= '';
  progreso: number;
  progresoMensaje="esperando...";
  logeando=true;
  ProgresoDeAncho:string;
  spiner:boolean = false;
  emailClass = "form-control";
  claveClass = "form-control";

  clase="progress-bar progress-bar-info progress-bar-striped ";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth:AuthService,
    private toast:ToastrService) {
      this.progreso=0;
      this.ProgresoDeAncho="0%";

  }

  ngOnInit() {
    
  }

  invitado(){
    
    this.email = "invitado@gmail.com";
    this.clave = "invitado83";
  }
  invitado2(){
    this.email = "juan@gmail.com";
    this.clave = "Racing83";
  }

  Entrar() {
   
    this.spiner=true
    this.emailClass="form-control";
    this.claveClass="form-control";

    if(this.email.length<4)
    {
      this.emailClass="form-control error";

    }
    if(this.clave.length<4)
    {
      this.claveClass="form-control error";

    }
    
    this.auth.login(this.email, this.clave)
      .then(res => {
        this.spiner=false;
        this.router.navigate(['/Principal']);
      })
      .catch(error => {
       
        this.toast.error("Los datos son incorrectos o no existe el usuario");
        this.spiner=false;
        this.logeando =true;
       
      })
  }


}
