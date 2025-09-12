import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonSegment, IonSegmentButton, IonLabel, IonItem, IonInput, IonButton} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../services/auth';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonSegment, IonSegmentButton, IonLabel, RouterLink, IonItem, IonInput, IonButton]
})



export class RegistroPage implements OnInit {

  constructor(private auth: Auth, private router: Router, private alertController: AlertController) { }

  user = {
    nombre: '',
    email: '',
    contrasena: '',
    confirmarContrasena: ''
  }

  async generarAlerta(titulo: string, mensaje: string){
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });

    await alert.present();
  }

  verificarContrasena(){
  if (this.user.contrasena !== this.user.confirmarContrasena){
    this.generarAlerta("Error","Las contraseñas no coinciden.");
    return false;
    } 
    return true;
  }

  ngOnInit() {
  }

  registrarse(){

    if (!this.user.email.includes('@')) {
      this.generarAlerta("Error","Ingresa un correo válido con @");
      return;
    }

    if (!this.user.nombre || !this.user.email || !this.user.contrasena || !this.user.confirmarContrasena) {
      this.generarAlerta("Error","Por favor completa todos los campos.");
      return;
    }

    if (this.verificarContrasena()){
    console.log("Registrando")

        this.auth.registrarse(this.user.nombre, this.user.email, this.user.contrasena).subscribe({
          next: (usuario) => {
            console.log("Yupi")
            console.log("Usuario registrado con éxito.", usuario)
            this.user = {
              nombre: '',
              email: '',
              contrasena: '',
              confirmarContrasena: ''
            };
            this.generarAlerta("Exitoso", "Ahora, inicie sesión.")

          },

          error: (err) => {
            console.error("El usuario ya existe", err)
            this.generarAlerta("Error","El usuario ya existe.")
          } 

        })
    }
  }
}
