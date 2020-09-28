import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private AFauth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore) {
  }

  getUserUid()
  {  
      return new Promise((resolve, reject) => {
        this.AFauth.onAuthStateChanged(function(user){
            if(user)
            {
              resolve(user.uid)
            }
            else
            {
              resolve("0")
            }
        })
        
      })


  }
    
  getLogueado(){
    let user = this.AFauth.currentUser;
    if(user != undefined && user!= null)
    { 
      console.info(JSON.stringify(user))
      return true;
    }
    else
    {
      return false;
    }
  }

  getCurrentUser() {
     let user = this.AFauth.currentUser;
    return user;
  }

  login(email: string, password: string) {

    return new Promise((resolve, reject) => {
      this.AFauth.signInWithEmailAndPassword(email, password)
        .then(user => {
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    })
  }

  logout() {
    this.AFauth.signOut().then(() => {
      this.router.navigate(['/Login']);
    })
  }

  register(name: string,cuil:number,sexo:string,email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.AFauth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res.user.uid);
          const uid = res.user.uid;
          this.db.collection("usuarios").doc(res.user.uid).set({
            nombre: name,
            uid: uid,
            perfil: 'usuario',
            cuil:cuil,
            sexo:sexo,
            puntajes : [
              {'adivinaG': 0},
              {'agilidadG': 0},
              {'anagramaG': 0},
              {'pptG': 0},
              {'simonG': 0},
              {'tatetiG': 0},
              {'memotestG':0},
              {'adivinaP': 0},
              {'agilidadP': 0},
              {'anagramaP': 0},
              {'pptP': 0},
              {'simonP': 0},
              {'tatetiP': 0},
              {'memotestP':0},
              {'tatetiE':0},
              {'pptE':0}
            ]
          })
          resolve(res)
        })
        .catch(error => { reject(error) });
    });
  }

}
