import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../../features/dashboard/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(data: { email: string; password: string }): Observable<User | null> {
    return this.http.get<User[]>(environment.apiUrl + 'users', {
      params: {
        email: data.email,
        password: data.password,
      }
    }).pipe(
      map((response) => {
        if (response.length > 0) {
          const authUser = response[0];
          return authUser;
        }
        return null; 
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['auth', 'login']);  
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false);
    }
    return this.http.get<User[]>(environment.apiUrl + 'users', {
      params: { token }
    }).pipe(
      map((response) => {
        return response.length > 0;
      })
    );
  }
}