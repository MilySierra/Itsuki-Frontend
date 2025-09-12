import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonSegment, IonSegmentButton, IonLabel, IonButton, IonItem, IonInput} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import {Auth} from '../services/auth';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, RouterLink, IonSegmentButton, IonSegment, IonLabel, IonButton, IonItem, IonInput]
})
export class LoginPage implements OnInit {

    user = {
    email: '',
    contrasena: ''
  };

  isLoggedIn = false;
  constructor(private auth: Auth, private router: Router, private alertController: AlertController) { }

  async generarAlerta(titulo: string, mensaje: string){
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
  }

  login(){

    if (!this.user.email.includes('@')) {
      this.generarAlerta("Error","Ingresa un correo válido con @");
      return;
    }

    if (!this.user.email || !this.user.contrasena) {
      this.generarAlerta("Error","Por favor completa todos los campos.");
      return;
    }
    console.log("Intentando iniciar sesión con:", this.user);

    this.auth.login(this.user.email, this.user.contrasena).subscribe({
      next: (usuario) => {
        console.log("Usuario logueado", usuario)
        this.auth.guardarSesion(usuario);
        console.log("Yupi")
        this.user = {
          email: '',
          contrasena: '',
        };
        this.router.navigate(['/home']);
      },

      error: (err) =>{
        console.error("Credenciales malas o el usuario no existe", err)
        this.generarAlerta("Error","Las credenciales son incorrectas.")
      }
    }

    )
  }
}
