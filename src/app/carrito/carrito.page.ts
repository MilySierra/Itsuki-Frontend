import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonThumbnail, IonLabel, IonButton } from '@ionic/angular/standalone';
import { Carrito, CarritoService } from '../services/carrito-service';
import { Auth } from '../services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonList, IonItem, IonThumbnail, IonLabel, IonButton, RouterModule]
})
export class CarritoPage implements OnInit {

  constructor(private carritoService: CarritoService, private auth: Auth) { }

  carrito: Carrito[] = [];

  ngOnInit() {
    this.mostrarCarrito();
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
      },

      error: (err) => {
        console.log("No es posible mostrar el carrito", err);
      }
    })
  }

}
