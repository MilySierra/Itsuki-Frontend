import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Carrito{
  id: number;
  cantidad: number;
  id_usuario: number;
  id_producto: number;
  nombre_producto: String;
  precio_producto: number;
  imagen: String;
  descripcion: String;
  subtotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private arl= 'http://localhost:8080'
  httpClient = inject(HttpClient);

  saveProduct(id_usuario: number, id_producto: number): Observable<Carrito>{
    return this.httpClient.post<Carrito>(`${this.arl}/carrito/${id_usuario}/${id_producto}`, null)
  }

  showCarrito(id_usuario: number): Observable<Carrito[]>{
    return this.httpClient.get<Carrito[]>(`${this.arl}/carrito/${id_usuario}`)
  }
  
}
