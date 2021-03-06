import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// importo del module principal
import { RouterModule, Routes } from '@angular/router';
import { AdivinaElNumeroComponent } from '../componentes/adivina-el-numero/adivina-el-numero.component';
import { ListadoDeResultadosComponent } from '../componentes/listado-de-resultados/listado-de-resultados.component';
import { LoginComponent } from '../componentes/login/login.component';
import { ErrorComponent } from '../componentes/error/error.component';
import { PrincipalComponent } from '../componentes/principal/principal.component';
import { AgilidadAritmeticaComponent } from '../componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { MenuComponent } from '../componentes/menu/menu.component';
import { AdivinaMasListadoComponent } from '../componentes/adivina-mas-listado/adivina-mas-listado.component';
import { AgilidadMasListadoComponent } from '../componentes/agilidad-mas-listado/agilidad-mas-listado.component';
import { ListadoComponent } from'../componentes/listado/listado.component'
import { ListadosComponent } from '../componentes/listados/listados.component';
import { JuegosComponent } from '../componentes/juegos/juegos.component';
import { RegistroComponent } from '../componentes/registro/registro.component';
import { MenuCardComponent } from '../componentes/menu-card/menu-card.component';
import { CabeceraComponent } from '../componentes/cabecera/cabecera.component';
import { QuienSoyComponent } from '../componentes/quien-soy/quien-soy.component'
import { ListadoDePaisesComponent } from '../componentes/listado-de-paises/listado-de-paises.component'
import { MapaDeGoogleComponent } from '../componentes/mapa-de-google/mapa-de-google.component'
import { JugadoresListadoComponent } from '../componentes/jugadores-listado/jugadores-listado.component';
import { AnagramaComponent } from "../componentes/anagrama/anagrama.component";
import { PiedraPapelTijeraComponent } from "../componentes/piedra-papel-tijera/piedra-papel-tijera.component";
import { TatetiComponent } from "../componentes/tateti/tateti.component";
import { MemoTestComponent } from "../componentes/memo-test/memo-test.component";
import { SimonComponent } from "../componentes/simon/simon.component";
import {AuthGuard } from "../guards/auth.guard";


// declaro donde quiero que se dirija
const MiRuteo = [
{path: 'Jugadores' , component: JugadoresListadoComponent,canActivate: [AuthGuard]},
{path: '' , component: LoginComponent},
{path: 'Login' , component: LoginComponent},
{path: 'Mapa' , component: MapaDeGoogleComponent},
{path: 'QuienSoy' , component: QuienSoyComponent},
{path: 'Registro' , component: RegistroComponent},
{path: 'Principal' , component: PrincipalComponent,canActivate: [AuthGuard]},
{path: 'Listado' , component: ListadoComponent,canActivate: [AuthGuard]},
{path: 'Paises' , component: ListadoDePaisesComponent},

{ path: 'Juegos' ,
component: JuegosComponent ,
canActivate: [AuthGuard],
children:
[{path: '' , component: MenuCardComponent},
       {path: 'Anagrama' , component: AnagramaComponent},
       {path: 'MemoTest' , component: MemoTestComponent},
       {path: 'Simon' , component: SimonComponent},       
       {path: 'Tateti' , component: TatetiComponent},
       {path: 'PPT' , component: PiedraPapelTijeraComponent},
       {path: 'Adivina' , component: AdivinaElNumeroComponent},
      {path: 'AdivinaMasListado' , component: AdivinaMasListadoComponent},
      {path: 'AgilidadaMasListado' , component: AgilidadMasListadoComponent},
      {path: 'Agilidad' , component: AgilidadAritmeticaComponent}]
},
/*{
path: 'Principal' , 
component: PrincipalComponent,
canActivate: [AuthGuard]
},*/
{path: '**' , component: ErrorComponent},

{path: 'error' , component: ErrorComponent}];


@NgModule({
  imports: [
    RouterModule.forRoot(MiRuteo)
  ],
  exports: [
    RouterModule
  ]
})
export class RuteandoModule { }
