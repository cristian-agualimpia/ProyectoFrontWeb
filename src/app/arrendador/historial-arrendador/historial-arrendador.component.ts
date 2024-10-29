import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { Solicitud } from '../../../Conexion back/models/solicitud.model';
import { ArrendadorService } from '../../../Conexion back/services/arrendador.service';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { SolicitudService } from '../../../Conexion back/services/solicitud.service';

@Component({
  selector: 'app-historial-arrendador',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './historial-arrendador.component.html',
  styleUrl: './historial-arrendador.component.css'
})
export class HistorialArrendadorComponent {
  historialSolicitudes: Solicitud[] = [];
  propiedades: Propiedad[] = [];
  nombreArrendadores: { [key: number]: string } = {}; // Mapeo de arrendadorId a nombre del arrendador
  fechaActual: Date = new Date();

  constructor(
    private solicitudService: SolicitudService,
    private propiedadService: PropiedadService,
    private arrendadorService: ArrendadorService
  ) {}

  ngOnInit(): void {
    this.cargarHistorialArrendatario();
  }

  private cargarHistorialArrendatario(): void {
    this.solicitudService.getSolicitudesByArrendatarioId(1).subscribe((solicitudes: Solicitud[]) => {
      this.historialSolicitudes = solicitudes.filter(solicitud => new Date(solicitud.fechaPartida) < this.fechaActual);

      this.historialSolicitudes.forEach(solicitud => {
        this.propiedadService.getPropiedadEspecifica(solicitud.propiedadId).subscribe((propiedad: Propiedad) => {
          this.propiedades.push(propiedad);

          // Obtener el nombre del arrendador de la propiedad
          this.arrendadorService.obtenerArrendador(propiedad.arrendadorId).subscribe((arrendador: any) => {
            this.nombreArrendadores[propiedad.arrendadorId] = arrendador.nombre;
          });
        });
      });
    });
  }

  mostrarDetalles(id: number): void {
    this.propiedadService.mostrarDetalles(id);
    console.log("Se pulsó el botón detalles en el card " + id);
  }
}
