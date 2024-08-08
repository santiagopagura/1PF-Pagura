import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private router: Router) { }
  login() {
    localStorage.setItem('token','ajlhsjkdhlakshda');
    this.router.navigate(['dashboard', 'courses']);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['auth','login']);
  }
}

 