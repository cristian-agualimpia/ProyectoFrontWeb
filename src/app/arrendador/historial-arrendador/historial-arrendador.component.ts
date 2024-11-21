import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { Solicitud } from '../../../Conexion back/models/solicitud.model';
import { ArrendadorService } from '../../../Conexion back/services/arrendador.service';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { SolicitudService } from '../../../Conexion back/services/solicitud.service';
import { ArrendatarioService } from '../../../Conexion back/services/arrendatario.service';

@Component({
  selector: 'app-historial-arrendador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-arrendador.component.html',
  styleUrl: './historial-arrendador.component.css'
})
export class HistorialArrendadorComponent implements OnInit {
  propiedades: Propiedad[] = [];
  solicitudesAceptadas: { [key: number]: Solicitud[] } = {};
  nombreArrendatarios: { [key: number]: string } = {};

  constructor(
    private solicitudService: SolicitudService,
    private propiedadService: PropiedadService,
    private arrendadorService: ArrendadorService,
    private arrendatarioService: ArrendatarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarPropiedades();
  }

  private cargarPropiedades(): void {
    this.propiedadService.getPropiedadesArrendador(1).subscribe((propiedades: Propiedad[]) => {
      this.propiedades = propiedades;

      this.propiedades.forEach(propiedad => {
        if (propiedad.id !== undefined) {
          this.solicitudService.getSolicitudesByPropiedadId(propiedad.id).subscribe((solicitudes: Solicitud[]) => {
            this.solicitudesAceptadas[propiedad.id] = solicitudes.filter(solicitud => solicitud.aceptacion);

            this.solicitudesAceptadas[propiedad.id].forEach(solicitud => {
              if (solicitud.id !== undefined && solicitud.arrendatarioId !== undefined) {
                this.arrendatarioService.getArrendatario(solicitud.arrendatarioId).subscribe(arrendatario => {
                  if (arrendatario && solicitud.id !== undefined) {
                    this.nombreArrendatarios[solicitud.id] = arrendatario.nombre;
                  }
                });
              }
            });
          });
        }
      });
    });
  }

  calificarArrendador(id: number): void {

  }

  volver() {
    this.router.navigate(['/arrendador']);
  }
}