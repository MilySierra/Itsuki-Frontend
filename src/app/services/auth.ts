import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User{
  id: number;
  nombre: String;
  email: String;
  contrasena: String;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  private arl= 'http://localhost:8080'
  httpClient = inject(HttpClient);
  private currentUser: User | null = null;

  login(email:String, contrasena: String): Observable<User>{
    return this.httpClient.post<User>(`${this.arl}/usuario/login`,{email,contrasena})
  }

  registrarse(nombre:String, email:String, contrasena:String): Observable<User>{
    return this.httpClient.post<User>(`${this.arl}/usuario`,{nombre,email,contrasena})
  }

  guardarSesion(user: User){
    this.currentUser = user;
    localStorage.setItem("user",JSON.stringify(user));
  }

  obtenerUsuario(): User | null {
    if (this.currentUser) return this.currentUser;

    const usuarioPresente = localStorage.getItem("user");
    if (usuarioPresente){
      this.currentUser =JSON.parse(usuarioPresente);
    } 

    return this.currentUser;
  }

  isLoggedIn(): boolean{
    return this.obtenerUsuario() != null;
  }

  logOut(){
    this.currentUser = null;
    localStorage.removeItem("user");
  }

}
