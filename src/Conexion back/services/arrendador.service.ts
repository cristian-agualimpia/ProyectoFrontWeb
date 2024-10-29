import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Arrendador } from '../models/arrendador.model';

@Injectable({
  providedIn: 'root'
})
export class ArrendadorService {
  private apiUrl = 'http://localhost:8080/api/arrendador';

  constructor(private http: HttpClient) {}
  
  obtenerArrendador(id: number): Observable<any> {
    return this.http.get<Arrendador>(`${this.apiUrl}/arrendador/${id}`);
  }
  
  crearArrendador(arrendadorData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crearArrendador`, arrendadorData);
  }
}

