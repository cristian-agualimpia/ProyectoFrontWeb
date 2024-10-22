import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-propiedad',
  standalone: true,
  templateUrl: './card-propiedad.component.html',
  styleUrls: ['./card-propiedad.component.css']
})
export class CardPropiedadComponent {
  @Input() nombre: string = '';
  @Input() descripcion: string = '';
  @Input() precio: number = 0;
  @Input() imagenUrl: string = '';
}