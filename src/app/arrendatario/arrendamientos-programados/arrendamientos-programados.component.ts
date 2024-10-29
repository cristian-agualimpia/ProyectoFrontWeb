import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';


@Component({
  selector: 'app-arrendamientos-programados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './arrendamientos-programados.component.html',
  styleUrl: './arrendamientos-programados.component.css'
})
export class ArrendamientosProgramadosComponent {
  propiedades: Propiedad[] = [];
  llegada: string= "29/10/2024";
  partida: string= "31/10/2024";
  nombreArrendador: string="Pepito Perez";
  nombrePropiedad: string="Apto fantastico";

  constructor(private propiedadService: PropiedadService) {}

  ngOnInit(): void {
    // Suscribirse al BehaviorSubject de propiedades filtradas
    this.propiedadService.propiedadesFiltradas$.subscribe((data: Propiedad[]) => {
      this.propiedades = data;
    });
  }

  mostrarDetalles(id:number) {
    this.propiedadService.mostrarDetalles(id);
    console.log("Se pulsó el botón detalles en el card" + id)
  }
}