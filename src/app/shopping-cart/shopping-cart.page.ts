import { Component } from '@angular/core';
import { IonIcon, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { basketOutline } from 'ionicons/icons';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.page.html',
  styleUrls: ['./shopping-cart.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon]
})
export class ShoppingCartPage {
  constructor() {
    addIcons({ basketOutline });
  }
}