import { Component, Input } from '@angular/core';
import { SolicitudService } from '../../../Conexion back/services/solicitud.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-solicitud-card',
  standalone: true,
  imports: [],
  templateUrl: './solicitud-card.component.html',
  styleUrl: './solicitud-card.component.css'
})
export class SolicitudCardComponent {
  @Input() nombre: string = '';
  @Input() fechaLlegada: Date = new Date();
  @Input() fechaPartida: Date = new Date();
  @Input() nombreArrendatario: string = '';
  @Input() calificacionPromedio: number = 0;
  @Input() cantidadPersonas: number = 0;
  @Input() id: number =0;

  constructor(private solicitudDetalleService: SolicitudService) {}

  aceptarSolicitud() {
    this.solicitudDetalleService.aceptarSolicitud(this.id).pipe(
      catchError(error => {
          console.error('Error al aceptar la solicitud:', error);
          alert('Hubo un error al aceptar la solicitud. Por favor, inténtelo de nuevo.');
          return of(null); // Return a fallback value or empty observable
      })
  ).subscribe(response => {
      if (response) {
          alert('Solicitud aceptada');
      }
  });
}
}
