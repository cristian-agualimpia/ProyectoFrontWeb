import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VerticalComponentArrendatario } from "../vertical/vertical.component";

@Component({
  selector: 'app-inicio-arrendatario',
  standalone: true,
  imports: [VerticalComponentArrendatario, CommonModule ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponentArrendatario {
  verCuenta:boolean = true;

  mostrarCuenta(){
    this.verCuenta = !this.verCuenta;
  }
}
