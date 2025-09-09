import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCardTitle, IonIcon, IonCardContent, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, location, callOutline, mailOutline, timeOutline, ribbonOutline, heartOutline } from 'ionicons/icons';


@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
  standalone: true,
  imports: [ IonCardHeader, IonCardContent, IonIcon, IonCardTitle, IonContent, CommonModule, FormsModule, IonCard]
})
export class InformationPage implements OnInit {

  constructor() {
    addIcons({ star, location, callOutline, mailOutline, timeOutline, ribbonOutline, heartOutline });
   }
  

  ngOnInit() {
  }

}
