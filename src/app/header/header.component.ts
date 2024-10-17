import { CommonModule } from '@angular/common'; // Importar CommonModule
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BarraBusquedaComponent } from "../arrendador/barra-busqueda/barra-busqueda.component";
import { BarraBusquedaComponentArrendatario } from '../arrendatario/barra-busqueda/barra-busqueda.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, BarraBusquedaComponentArrendatario, BarraBusquedaComponent], // Asegúrate de agregar CommonModule aquí
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  verBarraBusqueda:boolean = true; // Estado para mostrar la barra de búsqueda
  verBusquedaArrendatario:boolean = false;
  verBusquedaArrendador:boolean = false;  
  rolArrendatario:boolean = true;
  verInicio:boolean = true;
 
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Verifica la URL y actualiza el estado de verBusquedaArrendatario
        if (event.url.includes('/arrendatario')) {
          this.verInicio = false; // Mostrar botón inicio
          this.rolArrendatario = true; // Mostrar barra de búsqueda para arrendatario
        } else if (event.url.includes('/arrendador')) {
          this.verInicio = false; // Mostrar botón inicio
          this.rolArrendatario = false; // Mostrar barra de búsqueda para arrendatario
        } else {
          this.verInicio = true; // Ocultar inicio / mostrar boton ver barra de busqueda
        } 

      });
  }

  mostrarBusqueda() {
    this.verBarraBusqueda = !this.verBarraBusqueda;
    if (this.rolArrendatario) {
      this.verBusquedaArrendatario = this.verBarraBusqueda;
    } else {
      this.verBusquedaArrendador = this.verBarraBusqueda;
    }
  }
}
