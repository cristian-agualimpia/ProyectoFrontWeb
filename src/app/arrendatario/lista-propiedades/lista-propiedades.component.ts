import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardPropiedadComponent } from '../card-propiedad/card-propiedad.component';

@Component({
  selector: 'app-lista-propiedades',
  standalone: true,
  imports: [CommonModule, CardPropiedadComponent],
  templateUrl: './lista-propiedades.component.html',
  styleUrls: ['./lista-propiedades.component.css']
})
export class ListaPropiedadesComponent {
  propiedades = Array.from({ length: 15 }, (_, i) => ({
    nombre: `Propiedad ${i + 1}`,
    descripcion: 'Descripción corta de la propiedad, incluyendo características como número de habitaciones, baños, etc.',
    precio: (i + 1) * 100,
    imagenUrl: 'https://via.placeholder.com/150'
  }));
}