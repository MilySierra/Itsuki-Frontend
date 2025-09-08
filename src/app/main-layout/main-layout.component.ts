import { Component, OnInit } from '@angular/core';
import { IonIcon, IonTabBar, IonTabButton, IonTabs, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, cart , person, informationCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  imports: [IonIcon, IonTabBar, IonTabButton, IonTabs, IonBadge],
})

export class MainLayoutComponent {
  constructor() { 
    addIcons({ home, cart, person, informationCircleOutline });
  }
}
