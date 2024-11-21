import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';
import { UsuarioService } from '../../Conexion back/services/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {
  type: number = 1; // Por defecto, arrendador
  username: string = ''; // Usuario ingresado
  password: string = ''; // Contraseña ingresada
  errorMessage: string = ''; // Mensaje de error

  constructor(
    private router: Router,
    private usuarioService: UsuarioService // Servicio de usuario
  ) { }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault(); // Evitar recarga de la página al enviar el formulario

    // Validar formulario
    if (!form.valid) {
      this.errorMessage = 'Por favor completa todos los campos.';
      return;
    }

    // Determinar el tipo de usuario basado en el rol seleccionado
    this.type = form.value.role === 'arrendador' ? 1 : 2;

    // Llamar al servicio para iniciar sesión
    this.usuarioService.login(this.username, this.password, this.type)
      .subscribe({
        next: () => {
          // Redirigir basado en el tipo de usuario
          const routePath = this.type === 1 ? '/arrendador' : '/arrendatario';
          this.router.navigate([routePath]);
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error en login:', err);
          this.errorMessage = 'Credenciales incorrectas. Por favor, intenta de nuevo.';
        }
      });
  }
}