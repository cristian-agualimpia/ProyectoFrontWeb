import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Arrendador } from '../../Conexion back/models/arrendador.model';
import { Arrendatario } from '../../Conexion back/models/arrendatario.model';
import { ArrendadorService } from '../../Conexion back/services/arrendador.service';
import { ArrendatarioService } from '../../Conexion back/services/arrendatario.service';
import { UsuarioService } from '../../Conexion back/services/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})

export class PerfilComponent implements OnInit {
  rol?: string;
  id: number = 0;
  nombre: string = "";
  usuario: string = "";
  contrasena: string = "";
  nuevaContrasena: string = "" ;
  correo: string = "" ;

  showModal: boolean = false;
  errorContrasena: boolean = false;

  arrendatario?: Arrendatario;
  arrendador?: Arrendador;

  constructor(
    private router: Router,
    private arrendatarioService: ArrendatarioService,
    private arrendadorService: ArrendadorService,
    private usuarioService: UsuarioService
  ){};

  ngOnInit(): void {
    this.rol = this.usuarioService.getUsuarioTipo();
    this.id = this.usuarioService.getUsuarioID();
    this.nombre = this.usuarioService.getUsuarioNombre();

    if (this.rol == "arrendador") {
      this.arrendadorService.obtenerArrendador(this.id).subscribe(arrendador => {
        this.usuario = arrendador.usuario;
        this.contrasena = arrendador.contrasena;
        this.correo= arrendador.correo ;
      }); } else {
        this.arrendatarioService.obtenerArrendatario(this.id).subscribe(arrendatario => {
        this.usuario = arrendatario.usuario;
        this.contrasena = arrendatario.contrasena;
        this.correo= arrendatario.correo ;
        }); }

    }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  deleteAccount(): void {
    alert("Cuenta eliminada");
    this.closeModal();
  }

  saveChanges(): void {
    if (this.nuevaContrasena && this.nuevaContrasena !== this.contrasena) {
      this.errorContrasena = true;
      return;
    }
    this.errorContrasena = false;

    // Si hay una nueva contraseña, la asignamos al objeto arrendatario
    if (this.nuevaContrasena) {
      this.contrasena = this.nuevaContrasena;
    }

    if (this.rol = "arrendatario") {
    // Llamada al servicio para actualizar el arrendatario
    const arrendatario: Arrendatario = {
      id: this.id,
      usuario: this.usuario,
      contrasena: this.contrasena,
      nombre: this.nombre,
      status: 0, // Asegúrate de usar el valor correcto
      correo: this.correo,
      solicitudes: [],
      calificaciones: [],
      calificacionPromedio: 0
  };
    this.arrendatarioService.modificarUsuarioArrendatario(arrendatario, this.id)
      .subscribe({
        next: (response) => {
          alert("Cambios guardados exitosamente");
        },
        error: (err) => {
          console.error('Error al actualizar arrendatario:', err);
          alert("Hubo un error al guardar los cambios");
        }
      });
      this.router.navigate(['/arrendatario']);
    } else {
      // Llamada al servicio para actualizar el arrendador
    const arrendador: Arrendador = {
      id: this.id,
      usuario: this.usuario,
      contrasena: this.contrasena,
      nombre: this.nombre,
      status: 0, // Asegúrate de usar el valor correcto
      correo: this.correo,
      propiedades: [],
      calificaciones: []
  };
    this.arrendadorService.modificarUsuarioArrendador(arrendador, this.id)
      .subscribe({
        next: (response) => {
          alert("Cambios guardados exitosamente");
        },
        error: (err) => {
          console.error('Error al actualizar arrendador:', err);
          alert("Hubo un error al guardar los cambios");
        }
      });
      this.router.navigate(['/arrendador']);
    }
  }

  changeImage(): void {
    console.log("Cambiar imagen de perfil");
  }
}
