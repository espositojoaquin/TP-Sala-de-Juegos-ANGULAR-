import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

   user:string;
   cuil:number;
   email:string;
   sexo:string;
   clave:string;
   clave2:string;

  constructor( private toastr: ToastrService,
    private authService: AuthService,
    private router: Router ) {

   }

  registro()
  {
    this.authService.register(this.user,this.cuil ,this.sexo,this.email, this.clave)
    .then(auth => {
      this.router.navigate(['/Principal']);
    })
    .catch(err => {
      this.toastr.error(err, "ERROR");
    })
  }


  ngOnInit() {
  }

  }
