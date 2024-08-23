import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../features/dashboard/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private FAKE_USER : User = {
    email: 'faque@gmail.com',
    password: '1234',
    role: 'admin',
  }
  private VALID_TOKEN = 'sfdjaoe';

  private _authUser$ = new BehaviorSubject<User | null >(null);
  authUser$ =this._authUser$.asObservable() 


  constructor(private router: Router) { }

  login() {
    // localStorage.setItem('token',this.VALID_TOKEN);

    this._authUser$.next(this.FAKE_USER);
    localStorage.setItem('token', this.VALID_TOKEN);
    this.router.navigate(['dashboard', 'courses']);
  }

  logout(){
    localStorage.removeItem('token');
    this._authUser$.next(null);
    this.router.navigate(['auth','login']);
  }

  vrifyUser(): Observable<User | null> {
    const token =localStorage.getItem('token');
    if (token) {
      this._authUser$.next(this.FAKE_USER);
    }
    return this.authUser$;
  }

  verifyToken(): Observable<boolean> {
    const token =localStorage.getItem('token');
    const isValid = this.VALID_TOKEN === token;
    if (isValid) {
      this._authUser$.next(this.FAKE_USER);
    }
    return of(isValid);
  }
}

 