import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Producto{
  id: number,
  nombre: String,
  tipo: String,
  descripcion: String,
  precio: number,
  imagen: String;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private arl= 'http://localhost:8080'
  httpClient = inject(HttpClient);

  getAllProduct(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.arl}/producto`)
  }

  getByTipo(tipo: String): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.arl}/producto/${tipo}`)
  }

}
