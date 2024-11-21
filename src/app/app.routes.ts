import { Routes } from '@angular/router';
import { AccesoComponent } from './acceso/acceso.component';
import { ArrendamientosActualesComponent } from './arrendador/arrendamientos-actuales/arrendamientos-actuales.component';
import { HistorialArrendadorComponent } from './arrendador/historial-arrendador/historial-arrendador.component';
import { InicioComponentArrendador } from './arrendador/inicio/inicio.component';
import { PublicarPropiedadComponent } from './arrendador/publicar-propiedad/publicar-propiedad.component';
import { ArrendamientosProgramadosComponent } from './arrendatario/arrendamientos-programados/arrendamientos-programados.component';
import { HistorialArrendatarioComponent } from './arrendatario/historial-arrendatario/historial-arrendatario.component';
import { InicioComponentArrendatario } from './arrendatario/inicio/inicio.component';
import { ListaDeseosComponent } from './arrendatario/lista-deseos/lista-deseos.component';
import { PrincipalLandingComponent } from './landing/principal-landing/principal-landing.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RegistroComponent } from './registro/registro.component';
import { DetallesPropiedadComponentArrendador } from './arrendador/detalles-propiedad/detalles-propiedad.component';
import { EdicionPropiedadComponent } from './arrendador/edicion-propiedad/edicion-propiedad.component';
import { AuthGuard } from './guards/auth.guard';
import { ArrendadorGuard } from './guards/arrendador.guard';
import { ArrendatarioGuard } from './guards/arrendatario.guard';

export const routes: Routes = [
    // General
    { path: '', component: PrincipalLandingComponent },
    { path: 'login', component: AccesoComponent },
    { path: 'register', component: RegistroComponent },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] }, // Rutas protegidas

    // Arrendatario (protegido por rol)
    { path: 'arrendatario', component: InicioComponentArrendatario, canActivate: [AuthGuard, ArrendatarioGuard] },
    { path: 'lista-deseos', component: ListaDeseosComponent, canActivate: [AuthGuard, ArrendatarioGuard] },
    { path: 'arrendamientos-programados', component: ArrendamientosProgramadosComponent, canActivate: [AuthGuard, ArrendatarioGuard] },
    { path: 'historial-arrendatario', component: HistorialArrendatarioComponent, canActivate: [AuthGuard, ArrendatarioGuard] },

    // Arrendador (protegido por rol)
    { path: 'arrendador', component: InicioComponentArrendador, canActivate: [AuthGuard, ArrendadorGuard] },
    { path: 'historial-arrendador', component: HistorialArrendadorComponent, canActivate: [AuthGuard, ArrendadorGuard] },
    { path: 'arrendamientos-actuales', component: ArrendamientosActualesComponent, canActivate: [AuthGuard, ArrendadorGuard] },
    { path: 'publicar-propiedad', component: PublicarPropiedadComponent, canActivate: [AuthGuard, ArrendadorGuard] },
    { path: 'arrendador/detalles-propiedad/:id', component: DetallesPropiedadComponentArrendador, canActivate: [AuthGuard, ArrendadorGuard] },
    { path: 'arrendador/edicionPropiedad/:id', component: EdicionPropiedadComponent, canActivate: [AuthGuard, ArrendadorGuard] },

    // Redirección para rutas no encontradas
    { path: '**', redirectTo: '' }, // Redirige a la página principal
];
