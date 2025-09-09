import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonButton, IonList, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, callOutline, mailOutline, locationOutline, cardOutline, settingsOutline, starOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonBadge, IonList, IonButton, IonLabel, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule, IonIcon ]
})
export class ProfilePage implements OnInit {

  constructor() { 
     addIcons({ personOutline, callOutline, mailOutline, locationOutline, cardOutline, starOutline, settingsOutline, logOutOutline });
  }

  ngOnInit() {
  }

}
