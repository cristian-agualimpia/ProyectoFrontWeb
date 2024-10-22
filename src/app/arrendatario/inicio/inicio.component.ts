import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VerticalComponentArrendatario } from "../vertical/vertical.component";
import { ListaPropiedadesComponent } from "../lista-propiedades/lista-propiedades.component";

@Component({
  selector: 'app-inicio-arrendatario',
  standalone: true,
  imports: [VerticalComponentArrendatario, CommonModule, ListaPropiedadesComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponentArrendatario {
  verCuenta: boolean = false;

  mostrarCuenta() {
    this.verCuenta = !this.verCuenta;
  }
}
