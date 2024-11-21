import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Arrendador } from '../../Conexion back/models/arrendador.model';
import { Arrendatario } from '../../Conexion back/models/arrendatario.model';
import { ArrendadorService } from '../../Conexion back/services/arrendador.service';
import { ArrendatarioService } from '../../Conexion back/services/arrendatario.service';
import { UsuarioService } from '../../Conexion back/services/usuario.service';
import { CalificacionService } from '../../Conexion back/services/calificacion.service';
import { Calificacion } from '../../Conexion back/models/calificacion.model';

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
  solicitudes:[] = [];
  calificaciones?:any;

  arrendador?: Arrendador;
  propiedades:[]=[];
  calificacionPromedio: number= 0;

  constructor(
    private router: Router,
    private arrendatarioService: ArrendatarioService,
    private arrendadorService: ArrendadorService,
    private usuarioService: UsuarioService,
    private calificacionService: CalificacionService
  ){};

  ngOnInit(): void {
    this.rol = this.usuarioService.getUsuarioTipo();
    this.id = this.usuarioService.getUsuarioID();
    this.nombre = this.usuarioService.getUsuarioNombre();

    if (this.rol == "arrendador") {
      this.arrendadorService.obtenerArrendador(this.id).subscribe(arrendador => {
        this.usuario = arrendador.usuario;
        this.contrasena = arrendador.contrasena;
        this.nuevaContrasena = this.contrasena;
        this.correo= arrendador.correo ;
        this.nombre = arrendador.nombre;
        this.calificacionPromedio = arrendador.calificacionPromedio;
        
      

      }); } else {
        this.arrendatarioService.obtenerArrendatario(this.id).subscribe(arrendatario => {
        this.usuario = arrendatario.usuario;
        this.contrasena = arrendatario.contrasena;
        this.nuevaContrasena = this.contrasena;
        this.correo= arrendatario.correo ;
        this.nombre= arrendatario.nombre;
        this.calificacionPromedio = arrendatario.calificacionPromedio;

        }); }
        if (this.rol === 'arrendador') {
          this.calificacionService.getCalificacionesByArrendadorId(this.id).subscribe(calificaciones => {
            this.calificaciones = calificaciones;
          });
        } else if (this.rol === 'arrendatario') {
          this.calificacionService.getCalificacionesByArrendatarioId(this.id).subscribe(calificaciones => {
            this.calificaciones = calificaciones;
          });
        }
    }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  deleteAccount(): void {
    if(this.rol = "arrendatario") {
      this.arrendatarioService.eliminarArrendatario(this.id)
        .subscribe({
          next: (response) => {
            console.log("Arrendatario eliminado exitosamente");
          },
          error: (err) => {
            console.log("Arrendatario eliminado exitosamente");
          }
        });
    }else if (this.rol = "arrendador") {
      this.arrendadorService.eliminarArrendador(this.id)
        .subscribe({
          next: (response) => {
            console.log("Arrendador eliminado exitosamente");
          },
          error: (err) => {
            console.log("Arrendatario eliminado exitosamente");
          }
        });

    }
    alert("Cuenta eliminada");
    this.closeModal();
    this.router.navigate(['/']);
  }

  saveChanges(): void {
    if (this.nuevaContrasena !== this.contrasena) {
      this.errorContrasena = true;
      return;
    }
    this.errorContrasena = false;

    /*Si hay una nueva contraseña, la asignamos al objeto arrendatario
    if (this.nuevaContrasena) {
      this.contrasena = this.nuevaContrasena;
    }
    */

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
    } else if (this.rol = "arrendador") {
      // Llamada al servicio para actualizar el arrendador
      const arrendador: Arrendador = {
        id: this.id,
        usuario: this.usuario,
        contrasena: this.contrasena,
        nombre: this.nombre,
        status: 0, // Asegúrate de usar el valor correcto
        correo: this.correo,
        propiedades: [],
        calificaciones: [],
        calificacionPromedio: 0
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
      
      this.usuarioService.actualizarNombreUsuario()

  }

  changeImage(): void {
    console.log("Cambiar imagen de perfil");
  }

  volver(): void {
    const ruta = this.rol === 'arrendador' ? '/arrendador' : '/arrendatario';
    this.router.navigate([ruta]);
  }
}
