import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthData } from './auth-data.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}


  criarUsuario(email: string, password: string){
    const authData: AuthData = {email: email, password: password};
    this.http.post("http://localhost:27017/api/usuarios/signup", authData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string){
    const authData: AuthData = {email: email, password: password};
    this.http.post("http://localhost:27017/api/usuarios/login", authData)
      .subscribe(response => {
        console.log(response);
      })
  }
}
