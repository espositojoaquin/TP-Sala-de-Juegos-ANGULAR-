import { Injectable } from '@angular/core';
import { ITarjeta } from "../clases/interface/ITarjeta";

@Injectable()
export class TableroService {

    private NombreTarjetas = ['fa-car', 'fa-bug', 'fa-diamond', 'fa-heart', 'fa-binoculars', 'fa-apple',
    'fa-cc-visa', 'fa-internet-explorer', 'fa-star', 'fa-university', 'fa-facebook', 'fa-instagram',
    'fa-youtube', 'fa-angellist', 'fa-wifi', 'fa-tint', 'fa-life-ring', 'fa-suitcase', 'fa-futbol-o',
    'fa-motorcycle', 'fa-leaf', 'fa-eye', 'fa-coffee', 'fa-bullseye', 'fa-plane' ];

    mezclar(tarjetas: ITarjeta[]) {
        const newArr = tarjetas.slice();
        for (let i = newArr.length; i; i -= 1) {
            const j = Math.floor(Math.random() * i);
            const x = newArr[i - 1];
            newArr[i - 1] = newArr[j];
            newArr[j] = x;
        }
        return newArr;
    }

    getTarjetas(cantidadTarjetas) {
        let tarjetas = this.NombreTarjetas.slice(0, cantidadTarjetas).map(t => ({
            nombre: t,
            visible: false
        }));
        tarjetas = tarjetas.concat(tarjetas).map((t, i) => ({
            _id: i,
            nombre: t.nombre,
            visible: t.visible,
        }));
        return this.mezclar(tarjetas);
    }
}
