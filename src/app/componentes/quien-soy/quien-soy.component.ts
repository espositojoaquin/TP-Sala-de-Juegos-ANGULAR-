import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../servicios/auth.service";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})
export class QuienSoyComponent implements OnInit {

  constructor(private auth:AuthService, private route:Router) { }
  link:string;
  ngOnInit() {
    let user;
      this.auth.getUserUid().then(res => {
        user = res;
        
        if(user != 0 && user!=undefined)
        { 
          this.link = "/Principal";
          
        }
        else
        {  
          this.link = "/Login";
          
        }
    }).catch(res =>{
      this.link = "/Login";
    })
   
  }



}
