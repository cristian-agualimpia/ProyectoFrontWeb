import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-barra-busqueda-arrendatario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-busqueda.component.html',
  styleUrls: ['./barra-busqueda.component.css']
})
export class BarraBusquedaComponentArrendatario {
  // Variable para controlar si el dropdown está abierto o cerrado
  isDropdownOpen: boolean = false;

  // Cantidades de personas
  adultos: number = 1; // Comenzamos con 1 adulto
  ninos: number = 0;   // Comenzamos con 0 niños
  bebes: number = 0;   // Comenzamos con 0 bebés
  mascotas: number = 0; // Comenzamos con 0 mascotas

  // Método para alternar el dropdown
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Método para cerrar el dropdown cuando se haga clic fuera
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (!targetElement.closest('.dropdown-toggle') && !targetElement.closest('.dropdown-menu')) {
      this.isDropdownOpen = false;
    }
  }

  // Métodos para aumentar/disminuir adultos, niños, bebés, mascotas
  aumentarAdultos() {
    this.adultos++;
  }

  disminuirAdultos() {
    if (this.adultos > 0) {
      this.adultos--;
    }
  }

  aumentarNinos() {
    this.ninos++;
  }

  disminuirNinos() {
    if (this.ninos > 0) {
      this.ninos--;
    }
  }

  aumentarBebes() {
    this.bebes++;
  }

  disminuirBebes() {
    if (this.bebes > 0) {
      this.bebes--;
    }
  }

  aumentarMascotas() {
    this.mascotas++;
  }

  disminuirMascotas() {
    if (this.mascotas > 0) {
      this.mascotas--;
    }
  }
}
