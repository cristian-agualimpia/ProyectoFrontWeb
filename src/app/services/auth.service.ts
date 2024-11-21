import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Arrendador } from '../../Conexion back/models/arrendador.model';
import { Arrendatario } from '../../Conexion back/models/arrendatario.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private baseUrl = 'http://localhost:8080/api/auth'; // URL base del backend

    constructor(private http: HttpClient) { }

    // Método para iniciar sesión
    login(username: string, password: string, type: number): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, { username, password, type });
    }

    // Guardar token y tipo de usuario en localStorage
    saveSession(token: string, type: string): void {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userType', type); // arrendador o arrendatario
    }

    // Obtener el token de localStorage
    getToken(): string | null {
        return localStorage.getItem('authToken');
    }

    // Obtener el tipo de usuario de localStorage
    getUserType(): string | null {
        return localStorage.getItem('userType');
    }

    // Cerrar sesión eliminando datos de localStorage
    logout(): void {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
    }

    // Verificar si el usuario está autenticado
    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    // Obtener datos del usuario actual según su tipo
    getCurrentUserData(): Observable<Arrendador | Arrendatario | null> {
        const token = this.getToken();
        const type = this.getUserType();

        if (token && type) {
            const url =
                type === 'arrendador'
                    ? 'http://localhost:8080/api/arrendador/arrendador-actual'
                    : 'http://localhost:8080/api/arrendatario/arrendatario-actual';

            return this.http.get<Arrendador | Arrendatario>(url, {
                headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
            });
        }

        console.error('No hay token o tipo de usuario en localStorage.');
        return of(null); // Devuelve un observable vacío si no hay token
    }
}
