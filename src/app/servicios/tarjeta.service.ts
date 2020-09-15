import { Injectable } from '@angular/core';
//import { ITarjeta } from '../interface/ITarjeta';
import { ITarjeta } from "../clases/interface/ITarjeta";

@Injectable()
export class TarjetaService {

    private primerTarjetaAComparar: ITarjeta;
    private segundaTarjetaAComparar: ITarjeta;
    private aciertos: number;

    constructor() {}

    mostrarTarjeta(tarjeta: ITarjeta) {
        if (this.isEmpty(this.primerTarjetaAComparar) && this.isEmpty(this.segundaTarjetaAComparar)) {
            this.primerTarjetaAComparar = tarjeta;
            this.primerTarjetaAComparar.visible = true;
            return;
        }
        if (this.isEmpty(this.segundaTarjetaAComparar)) {
            this.segundaTarjetaAComparar = tarjeta;
            this.segundaTarjetaAComparar.visible = true;
            this.comparar(this.primerTarjetaAComparar, this.segundaTarjetaAComparar);
        }
    }

    comparar(tarjeta1, tarjeta2) {
        this.primerTarjetaAComparar = null;
        this.segundaTarjetaAComparar = null;
        if (tarjeta1.nombre === tarjeta2.nombre) {
            this.aciertos++;
        } else {
            setTimeout(function(){
                tarjeta1.visible = false;
                tarjeta2.visible = false;
            }, 1000);
        }
    }

    isEmpty(obj: any) {
        return obj === null || obj === undefined;
    }

    isUndefined(obj: object) {
        return obj === undefined;
    }

}
