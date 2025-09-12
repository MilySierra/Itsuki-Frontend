import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Carrito, CarritoService } from '../services/carrito-service';
import { Auth } from '../services/auth';
import { RouterModule } from '@angular/router';
import { Producto, ProductService } from '../services/product-service';
import { trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonList, IonItem, IonThumbnail, IonLabel, RouterModule, IonButton, IonIcon]
})
export class CarritoPage implements OnInit {

  constructor(private carritoService: CarritoService, private auth: Auth, private productoService: ProductService) { 
    addIcons({ trashOutline });
  }

  carrito: Carrito[] = [];
  total: number = 0;
  envio: number = 12500;
  cantidadProductos: number = 0;

  ngOnInit() {
    this.mostrarCarrito();
  }

  ionViewWillEnter() {
    this.mostrarCarrito();
  }

  calcularTotal(){
    this.total = this.carrito.reduce((acc, item) => acc + item.subtotal, 0);
  }

  mostrarCarrito(){
    const usuario = this.auth.obtenerUsuario();
    if(!usuario){
      alert("No hay usuario loggueado");
      return;
    }

    this.carritoService.showCarrito(usuario.id).subscribe({
      next: (productos) => {
        this.carrito = productos;
        console.log("Mostrando carrito con los productos", productos);
        this.calcularTotal(); 
      },

      error: (err) => {
        console.log("No es posible mostrar el carrito", err);
      }
    })
  }

  agregarAlCarrito(producto: Producto){
      const usuario = this.auth.obtenerUsuario();
      if (!usuario){
        alert("Debes iniciar sesión.");
        return;
      }
  
      this.carritoService.saveProduct(usuario.id, producto.id).subscribe({
        next: (carrito) => {
          this.mostrarCarrito();
          this.cantidadProductos += 1;
          console.log("Producto agregado al carro exitosamente", carrito);
        },
        error: (err) => {
          console.log("Error al cargar en el carrito", err);
        }
      })
  }

  aumentarCantidad(id: number){
    this.productoService.getById(id).subscribe({
      next: (producto) => {
        if (!producto){
          alert("El usuario no existe.")
          return;
        } 
        this.agregarAlCarrito(producto);
      },
      error: (err) =>{
        console.log("Error al obtener el producto", err);
      }
    })
    
  }

  disminuirCantidad(id: number){
    this.carritoService.updateProducto(id).subscribe({
      next: (producto) => {
        console.log("Producto actualizado: ", producto);
        this.mostrarCarrito();
      },
      error: (err) => {
        console.log("No fue posible actualizar", err);
      }
    })
  }

  eliminarProducto(id: number){
    this.carritoService.deleteProducto(id).subscribe({
      next: (producto) => {
        console.log("Producto eliminado: ", producto);
        this.mostrarCarrito();
      },
      error: (err) => {
        console.log("No fue posible eliminar", err);
      }
    })
  }
}
