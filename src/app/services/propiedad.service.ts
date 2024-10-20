import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Propiedad } from '../models/propiedad.model'; // Suponiendo que tienes un modelo definido para Propiedad

@Injectable({
  providedIn: 'root',
})
export class PropiedadService {
  private apiUrl = 'https://api.example.com/propiedades'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {}

  // Obtener todas las propiedades
  getPropiedades(): Observable<Propiedad[]> {
    return this.http.get<Propiedad[]>(this.apiUrl);
  }

  // Obtener una propiedad por ID
  getPropiedad(id: number): Observable<Propiedad> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Propiedad>(url);
  }

  // Agregar una nueva propiedad
  addPropiedad(propiedad: Propiedad): Observable<Propiedad> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Propiedad>(this.apiUrl, propiedad, { headers });
  }

  // Actualizar una propiedad existente
  updatePropiedad(propiedad: Propiedad): Observable<Propiedad> {
    const url = `${this.apiUrl}/${propiedad.id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Propiedad>(url, propiedad, { headers });
  }

  // Eliminar una propiedad
  deletePropiedad(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
