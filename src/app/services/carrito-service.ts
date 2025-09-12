import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Auth } from './auth';

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
  auth = inject(Auth);
  
  private cantidadProductos= new BehaviorSubject<number>(0);
  cantidadProductos$ = this.cantidadProductos.asObservable();

  private carritoProductos = new BehaviorSubject<Carrito[]>([]);
  carrito$ = this.carritoProductos.asObservable();

  private updateCantidad(id_usuario: number) {
    this.showCarrito(id_usuario).subscribe(productos => {
      this.cantidadProductos.next(productos.length);
      this.carritoProductos.next(productos);
    });
  }

  getSubtotal(): number {
    const carrito = this.carritoProductos.getValue();
    return carrito.reduce((acc, item) => acc + item.subtotal, 0);
  }

  saveProduct(id_usuario: number, id_producto: number): Observable<Carrito>{
    return this.httpClient.post<Carrito>(`${this.arl}/carrito/${id_usuario}/${id_producto}`, null).pipe(
      tap(() => this.updateCantidad(id_usuario))
    );
  }

  showCarrito(id_usuario: number): Observable<Carrito[]>{
    return this.httpClient.get<Carrito[]>(`${this.arl}/carrito/${id_usuario}`).pipe(
      tap(productos => this.carritoProductos.next(productos))
    )
  }

  updateProducto(id: number): Observable<Carrito>{
    return this.httpClient.put<Carrito>(`${this.arl}/carrito/${id}`, null)
  }

  deleteProducto(id: number): Observable<boolean>{
    return this.httpClient.delete<boolean>(`${this.arl}/carrito/${id}`).pipe(
      tap(() => {
      const usuario = this.auth.obtenerUsuario();
      if (usuario){
        this.updateCantidad(usuario.id);
      }
    })
    );
  }
}
