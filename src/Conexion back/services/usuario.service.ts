import { Injectable } from '@angular/core';
import { ArrendadorService } from './arrendador.service';
import { ArrendatarioService } from './arrendatario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Arrendador } from '../models/arrendador.model';
import { Arrendatario } from '../models/arrendatario.model';


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

  // Método para actualizar solo el nombre del usuario
  actualizarNombreUsuario() {
    const usuario = sessionStorage.getItem('usuario');

    if (!usuario) {
      console.error('No hay usuario almacenado en sessionStorage.');
      return;
    }

    const usuarioData = JSON.parse(usuario);
    const { id, tipoUsuario } = usuarioData;

    if (tipoUsuario === 'arrendador') {
      this.arrendadorService.obtenerArrendador(id).subscribe(arrendador => {
        usuarioData.nombre = arrendador.nombre;
        sessionStorage.setItem('usuario', JSON.stringify(usuarioData));
      });
    } else if (tipoUsuario === 'arrendatario') {
      this.arrendatarioService.obtenerArrendatario(id).subscribe(arrendatario => {
        usuarioData.nombre = arrendatario.nombre;
        sessionStorage.setItem('usuario', JSON.stringify(usuarioData));
      });
    } else {
      console.error('Tipo de usuario no válido.');
    }
  }

  // Método de logout para limpiar el sessionStorage
  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('type');
  }

  // Recupera los datos de usuario desde sessionStorage
  getUsuarioData(): Observable<Arrendador | Arrendatario | null> {
    // Verificar si estamos en el navegador
    const token = sessionStorage.getItem('token');
    const tipo = sessionStorage.getItem('type');

    if (token) {
      // Si el token está presente, realizar la solicitud HTTP según el tipo de usuario
      if (tipo === 'arrendador') {
        return this.http.get<Arrendador>(`${this.apiUrl}/arrendador/arrendador-actual`, {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        });
      } else if (tipo === 'arrendatario') {
        return this.http.get<Arrendatario>(`${this.apiUrl}/arrendatario/arrendatario-actual`, {
          headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
        });
      }
    }

    /*if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=').map(c => c.trim());
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);
      const token = cookies['token'];
      const tipo = cookies['type'];

      if (token) {
        // Si el token está presente, realizar la solicitud HTTP según el tipo de usuario
        if (tipo === 'arrendador') {
          return this.http.get<Arrendador>(`${this.apiUrl}/arrendador/arrendador-actual`, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
          });
        } else if (tipo === 'arrendatario') {
          return this.http.get<Arrendatario>(`${this.apiUrl}/arrendatario/arrendatario-actual`, {
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
          });
        }
      }
    }*/



    // Si no hay token o no estamos en el navegador, devolver null
    console.error('No hay token en sessionStorage o el código no está ejecutándose en el navegador.');
    return of(null);
  }


  login(username: string, password: string, type: number) {
    const body = { username, password, type };
    const tipo = type === 1 ? 'arrendador' : 'arrendatario';
    const headers = {
      'Content-Type': 'application/json',
    };

    this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, body, { headers })
      .subscribe(
        (response) => {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('type', tipo)
          //this.setSessionData(response.token, tipo)// Guarda el token en sessionStorage
          console.log('Login exitoso:', response);
        },
        (error) => {
          console.error('Error en login:', error);
        }
      );
  }

  /*setSessionData(token: string, type: string): void {
    document.cookie = `token=${token}; path=/; Secure; SameSite=Strict`;
    document.cookie = `type=${type}; path=/; Secure; SameSite=Strict`;
  }*/


  /*getUsuarioID() {
    return this.getUsuarioData().id
  }

  getUsuarioNombre() {
    return this.getUsuarioData().nombre
  }

  getUsuarioTipo() {
    return this.getUsuarioData().tipoUsuario
  }*/


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
