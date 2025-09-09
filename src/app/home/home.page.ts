import { Component, OnInit  } from '@angular/core';
import { IonContent, IonIcon, IonCard, IonCardContent, IonItem, IonLabel, IonList, IonThumbnail, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { timeOutline, starOutline, carOutline } from 'ionicons/icons';
import { Producto, ProductService } from '../services/product-service';
import { CarritoService } from '../services/carrito-service';
import { Auth } from '../services/auth';
import { CurrencyPipe, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonIcon, IonCard, IonCardContent, IonItem, IonLabel, IonList, IonThumbnail, IonButton, CurrencyPipe, CommonModule],
})
export class HomePage implements OnInit{
  constructor(private productService: ProductService, private carritoService: CarritoService, private auth: Auth, private router: Router) { 
    addIcons({ timeOutline, starOutline, carOutline});
  }

  producto = {
      nombre: '',
      tipo: '',
      descripcion: '',
      precio: 0,
      imagen : ''
    }
  
  productos: Producto[] = [];


  ngOnInit(): void {
    this.getByTipo('destacados');
  }

  ionViewWillEnter() {
    this.getByTipo('destacados');
  }

  irAProductos(tipo: string) {
    this.router.navigate(['/productos'], { queryParams: { tipo } });
  }

  getByTipo(tipo: String){
    this.productService.getByTipo(tipo).subscribe({
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

