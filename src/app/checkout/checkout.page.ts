import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonButton, IonBackButton, IonIcon } from '@ionic/angular/standalone';
import { RouterLink } from "@angular/router";
import { addIcons } from 'ionicons';
import { cardOutline, locationOutline, timeOutline } from 'ionicons/icons';
import { CarritoService } from '../services/carrito-service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonButton, RouterLink, IonIcon]
})
export class CheckoutPage implements OnInit {

  selectedPayment: string = '';
  selectedDeliveryTime: string = '';
  total: number = 0;
  envio: number = 12500;

  pedido = {
    direccion: '',
    valor: '',
    fecha: ''
  };

  constructor(private carritoService: CarritoService, private alertController: AlertController) {
    addIcons({locationOutline, cardOutline, timeOutline});
   }

  ngOnInit(){
    const usuario = this.carritoService.auth.obtenerUsuario(); 
    if (!usuario) 
      return;

    this.carritoService.showCarrito(usuario.id).subscribe({
      next: () => {
        this.total = this.carritoService.getSubtotal();
      },
      error: (err) => {
        console.log('Error al cargar carrito', err)
      }
      });

  this.carritoService.carrito$.subscribe(() => {
    this.total = this.carritoService.getSubtotal();
  });
  }

  async generarAlerta(titulo: string, mensaje: string){
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

}
