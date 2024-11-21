import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { CardPropiedadComponentArrendatario } from '../card-propiedad/card-propiedad.component';

@Component({
  selector: 'app-lista-propiedades-arrendatario',
  standalone: true,
  imports: [CommonModule, CardPropiedadComponentArrendatario],
  templateUrl: './lista-propiedades.component.html',
  styleUrls: ['./lista-propiedades.component.css']
})
export class ListaPropiedadesComponentArrendatario implements OnInit {
 // descripcionGenerica: string = "Esta es una descripción de la propiedad.";
  imagenGenerica: string = "https://picsum.photos/200/300";
  propiedades: Propiedad[] = [];

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit(): void {
    this.propiedadService.getPropiedades().subscribe(
      (data: Propiedad[]) => {
        this.propiedades = data;
        // Almacena las propiedades en el servicio para filtros futuros
        this.propiedadService.propiedades = data;
        this.propiedadService.propiedadesFiltradasSubject.next(data); // Emitir propiedades sin filtros inicialmente
      },
      (error) => {
        console.error('Error al obtener propiedades:', error);
      }
    );
  }
  
}
