import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
 public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
  constructor(private router:Router) {  }

  ngOnInit() {
  }

  reditect(path:string){
    this.router.navigate([path]);
  }





}
