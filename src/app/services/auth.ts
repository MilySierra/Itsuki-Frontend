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

  login(email:String, contrasena: String): Observable<User>{
    return this.httpClient.post<User>(`${this.arl}/usuario/login`,{email,contrasena})
  }

  registrarse(nombre:String, email:String, contrasena:String): Observable<User>{
    return this.httpClient.post<User>(`${this.arl}/usuario`,{nombre,email,contrasena})
  }

}
