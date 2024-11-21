import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../Conexion back/services/usuario.service';

@Component({
  selector: 'app-acceso',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css']
})
export class AccesoComponent {
  type: number = 1;
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService // Inyección de usuario.service
  ) { }

  onSubmit(event: Event, form: NgForm) {
    event.preventDefault(); // Evita la recarga de la página al enviar el formulario

    // Validar formulario y campo role
    if (form.valid && form.value.role && form.value.usuario) {
      const role = form.value.role;
      const id = Number(form.value.usuario); // Convertir a número


      // Llamar a accederUsuarioDemo para manejar el tipo de usuario y redirigir
      const isArrendador = role === 'arrendador';
      this.type = isArrendador ? 1 : 2;

      this.usuarioService.login(this.username, this.password, this.type);

      // Navegación basada en el tipo de usuario
      const routePath = isArrendador ? '/arrendador' : '/arrendatario';
      this.router.navigate([routePath]);
    } else {
      console.error("Formulario inválido o sin rol seleccionado");
    }
  }
}
