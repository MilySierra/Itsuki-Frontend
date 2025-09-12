import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonButton, IonList, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline, callOutline, mailOutline, locationOutline, cardOutline, settingsOutline, starOutline, logOutOutline } from 'ionicons/icons';
import { Auth } from '../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonItem, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, CommonModule, FormsModule, IonIcon]
})
export class ProfilePage implements OnInit {

  user = {
    id: 0,
    nombre: '',
    email: '',
    contrasena: ''
  };

  constructor(private auth: Auth, private router: Router) { 
     addIcons({ personOutline, callOutline, mailOutline, locationOutline, cardOutline, starOutline, settingsOutline, logOutOutline });
  }

  ngOnInit() {
    const usuario = this.auth.obtenerUsuario();
    console.log('Usuario desde localStorage:', usuario);
    if (usuario){
      this.user = usuario;
    }
  }

  ionViewWillEnter() {
    const usuario = this.auth.obtenerUsuario();
    console.log('Usuario desde localStorage:', usuario);
    if (usuario){
      this.user = usuario;
    }
  }


  logout(){
    this.auth.logOut();
    this.router.navigate(['/login']);
  }



}
