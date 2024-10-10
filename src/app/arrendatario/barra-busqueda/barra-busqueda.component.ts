import { CommonModule } from '@angular/common'; // Importar CommonModule
import { Component } from '@angular/core';

@Component({
  selector: 'app-barra-busqueda-arrendatario',
  standalone: true,
  imports: [CommonModule], // Asegúrate de agregar CommonModule aquí
  templateUrl: './barra-busqueda.component.html',
  styleUrl: './barra-busqueda.component.css'
})
export class BarraBusquedaComponentArrendatario {

}
