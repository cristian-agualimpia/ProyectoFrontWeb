import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Propiedad } from '../../../Conexion back/models/propiedad.model';
import { PropiedadService } from '../../../Conexion back/services/propiedad.service';
import { Solicitud } from '../../../Conexion back/models/solicitud.model';
import { SolicitudService } from '../../../Conexion back/services/solicitud.service';
import { ArrendadorService } from '../../../Conexion back/services/arrendador.service';
import { VerticalComponentArrendatario } from '../../arrendatario/vertical/vertical.component';

@Component({
  selector: 'app-arrendamientos-programados',
  standalone: true,
  imports: [CommonModule, RouterLink, VerticalComponentArrendatario],
  templateUrl: './arrendamientos-programados.component.html',
  styleUrl: './arrendamientos-programados.component.css'
})
export class ArrendamientosProgramadosComponent {
  propiedades: Propiedad[] = [];
  fechaLlegada: Date = new(Date);
  fechaPartida: Date = new(Date);
  nombreArrendador: string = "Pepito Perez";
  nombrePropiedad: string = "Apto fantastico";
  solicitudes: Solicitud[] = [];
  propiedad?: Propiedad

  constructor(private propiedadService: PropiedadService,
    private solicitudService: SolicitudService,
    private arrendadorService: ArrendadorService
  ) { }

  ngOnInit(): void {
    this.solicitudService.getSolicitudesByArrendatarioId(1).subscribe((data: Solicitud[]) => {
      this.solicitudes = data;
      this.solicitudes.forEach(solicitud => {
        if (!solicitud.aceptacion) {
          this.fechaLlegada = solicitud.fechaLlegada;
          this.fechaPartida = solicitud.fechaPartida;
          this.propiedadService.getPropiedadEspecifica(solicitud.propiedadId).subscribe((propiedad: Propiedad) => {
            this.propiedades.push(propiedad);
            this.propiedad = propiedad;
            this.arrendadorService.obtenerArrendador(propiedad.arrendadorId).subscribe((arrendador: any) => {
              this.nombreArrendador = arrendador.nombre;
            });
          });
        }
      });
    });
  }

}