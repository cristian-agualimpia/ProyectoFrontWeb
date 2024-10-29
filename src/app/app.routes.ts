// app.routes.ts
import { Routes } from '@angular/router';
import { AccesoComponent } from './acceso/acceso.component';
import { ArrendamientosActualesComponent } from './arrendador/arrendamientos-actuales/arrendamientos-actuales.component';
import { HistorialArrendadorComponent } from './arrendador/historial-arrendador/historial-arrendador.component';
import { InicioComponentArrendador } from './arrendador/inicio/inicio.component';
import { ArrendamientosProgramadosComponent } from './arrendatario/arrendamientos-programados/arrendamientos-programados.component';
import { HistorialArrendatarioComponent } from './arrendatario/historial-arrendatario/historial-arrendatario.component';
import { InicioComponentArrendatario } from './arrendatario/inicio/inicio.component';
import { ListaDeseosComponent } from './arrendatario/lista-deseos/lista-deseos.component';
import { PrincipalLandingComponent } from './landing/principal-landing/principal-landing.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
    //General
    { path: '', component: PrincipalLandingComponent },
    { path: 'login', component: AccesoComponent },
    { path: 'register', component: RegistroComponent },
    { path: 'arrendatario', component: InicioComponentArrendatario },
    { path: 'arrendador', component: InicioComponentArrendador },
    { path: 'perfil' , component: PerfilComponent},
    //Arrendatario 

    { path: 'lista-deseos', component: ListaDeseosComponent},
    { path: 'arrendamientos-programados', component: ArrendamientosProgramadosComponent},
    { path: 'historial-arrendatario', component: HistorialArrendatarioComponent},
    //arrendador
    { path: 'historial-arrendador', component: HistorialArrendadorComponent},
    { path: 'arrendamientos-actuales', component: ArrendamientosActualesComponent},


    { path: '**', redirectTo: '' },// Redirige a la página principal si la ruta no se encuentra
];