import { Injectable } from '@angular/core';
import { ArrendadorService } from './arrendador.service';
import { ArrendatarioService } from './arrendatario.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private arrendadorService: ArrendadorService,
    private arrendatarioService: ArrendatarioService,
    private http: HttpClient
  ) { }

  // Simulación de inicio de sesión sin autenticación
  accesoUsuarioDemo(id: number, esArrendador: boolean) {
    if (esArrendador) {
      this.arrendadorService.obtenerArrendador(id).subscribe(arrendador => {
        const usuarioData = {
          id: arrendador.id,
          nombre: arrendador.nombre,
          tipoUsuario: 'arrendador'
        };
        sessionStorage.setItem('usuario', JSON.stringify(usuarioData));
      });
    } else {
      this.arrendatarioService.obtenerArrendatario(id).subscribe(arrendatario => {
        const usuarioData = {
          id: arrendatario.id,
          nombre: arrendatario.nombre,
          tipoUsuario: 'arrendatario'
        };
        sessionStorage.setItem('usuario', JSON.stringify(usuarioData));
      });
    }
  }

  // Método de logout para limpiar el sessionStorage
  logout() {
    sessionStorage.removeItem('usuario');
  }

  // Recupera los datos de usuario desde sessionStorage
  getUsuarioData() {
    const token = sessionStorage.getItem('token');
  }

  login(username: string, password: string, type: number) {
    const body = { username, password, type };

    const headers = {
      'Content-Type': 'application/json',
    };

    this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, body, { headers })
      .subscribe(
        (response) => {
          sessionStorage.setItem('token', response.token); // Guarda el token en sessionStorage
          console.log('Login exitoso:', response);
        },
        (error) => {
          console.error('Error en login:', error);
        }
      );
  }


  /* Ejemplo de método accesoUsuario con autenticación basada en tokens (comentado)
  accesoUsuario(credentials: { username: string, password: string }) {
    return this.http.post<{ token: string }>('/api/authenticate', credentials)
      .pipe(
        tap(response => {
          sessionStorage.setItem('token', response.token);
          // Aquí se puede agregar lógica para almacenar más datos según el token recibido
        })
      );
  }
  */
}
