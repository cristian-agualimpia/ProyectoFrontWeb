import { CommonModule } from '@angular/common'; // Importar CommonModule
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BarraBusquedaComponentArrendatario } from '../arrendatario/barra-busqueda/barra-busqueda.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,BarraBusquedaComponentArrendatario], // Asegúrate de agregar CommonModule aquí
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  showSearchBar = false; // Estado para mostrar la barra de búsqueda
  isMobileMenuOpen = false; // Estado para el menú móvil

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Verifica la URL y actualiza el estado de showSearchBar
        if (event.url.includes('/arrendatario')) {
          this.showSearchBar = true; // Mostrar barra de búsqueda para arrendatarios
        } else {
          this.showSearchBar = false; // Ocultar para otras rutas
        }
      });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen; // Cambiar el estado del menú móvil
  }
}
