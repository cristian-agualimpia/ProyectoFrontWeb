// app.routes.ts
import { Routes } from '@angular/router';
import { AccesoComponent } from './acceso/acceso.component';
import { InicioComponentArrendador } from './arrendador/inicio/inicio.component';
import { InicioComponentArrendatario } from './arrendatario/inicio/inicio.component';
import { PrincipalLandingComponent } from './landing/principal-landing/principal-landing.component';
import { RegistroComponent } from './registro/registro.component';

export const routes: Routes = [
    { path: '', component: PrincipalLandingComponent },
    { path: 'login', component: AccesoComponent },
    { path: 'register', component: RegistroComponent },
    { path: 'arrendatario', component: InicioComponentArrendatario },
    { path: 'arrendador', component: InicioComponentArrendador },
    { path: '**', redirectTo: '' }  // Redirige a la página principal si la ruta no se encuentra
];