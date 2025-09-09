import { Component } from '@angular/core';
import { IonContent, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { timeOutline, starOutline, carOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonIcon, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail, IonButton],
})
export class HomePage {
  constructor() { 
    addIcons({ timeOutline, starOutline, carOutline});
  }
}

