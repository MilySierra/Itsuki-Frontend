import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonList, IonItem, IonThumbnail, IonLabel } from '@ionic/angular/standalone';
import { Producto, ProductService } from '../services/product-service';
import { RouterModule, ActivatedRoute } from "@angular/router";
import { CarritoService } from '../services/carrito-service';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonList, IonItem, IonThumbnail, IonLabel, RouterModule]
})
export class ProductosPage implements OnInit {

  producto = {
    nombre: '',
    tipo: '',
    descripcion: '',
    precio: 0,
    imagen : ''
  }

  productos: Producto[] = [];

  constructor(private productService: ProductService, private carritoService: CarritoService, private auth: Auth, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      const tipo = params['tipo'];
      if (tipo) {
        this.producto.tipo = tipo;
        this.getByTipo();
      } else {
        this.getAllProduct();
      }
    });
  }

  getAllProduct(){
    this.productService.getAllProduct().subscribe({
      next: (datos) => {
        this.productos = datos;
        console.log("Productos cargados", this.productos);
      },
      error: (err) => {
        console.log("Error al cagar los productos", err);
      }
    })
  }

  getByTipo(){
    this.productService.getByTipo(this.producto.tipo).subscribe({
      next: (datos) => {
        this.productos = datos;
        console.log("Productos cargados", this.productos);
      },
      error: (err) => {
        console.log("Error al cagar los productos", err);
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
        console.log("Producto agregado al carro exitosamente", carrito);
      },
      error: (err) => {
        console.log("Error al cargar en el carrito", err);
      }
    })
  }

}
