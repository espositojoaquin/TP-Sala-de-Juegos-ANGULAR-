
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { firestore } from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user: any;
  dbUsersRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.dbUsersRef = this.db.collection("usuarios");
  }

  getUsers() {
    return this.dbUsersRef.valueChanges();
  }

  getUserByUid(uid: string) {
    return this.dbUsersRef.doc(uid).valueChanges();
  }

  updatePuntaje(userUid, puntos) {
    console.info("puntajes updates", puntos); 
    return this.dbUsersRef.doc(userUid).update({
      puntajes: puntos
    })
    // this.dbUsersRef.doc(userUid).update({
    //   puntajes: 
    // })
    // this.getUserByUid(userUid).subscribe(res => {
    //   this.user = res;
    //   console.info("res", res);
    // })
  }
}
