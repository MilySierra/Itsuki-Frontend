import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonList, IonItem, IonThumbnail, IonLabel } from '@ionic/angular/standalone';
import { Producto, ProductService } from '../services/product-service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, IonList, IonItem, IonThumbnail, IonLabel]
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

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAllProduct;
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

}
