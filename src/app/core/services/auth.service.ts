import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { User } from '../../features/dashboard/models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUser$ = new BehaviorSubject<User | null >(null);
  authUser$ =this._authUser$.asObservable() 
  private currentUserRole: string | null = null;


  constructor(private http:HttpClient, private router: Router) { }

  login(data:{email:string, password: string}) {
    this.http.get<User[]>(environment.apiUrl + 'users',{
      params:{
        email: data.email,
        password: data.password,
      }
    }).subscribe({
      next: (response) => {
        if (!response.length) {
          alert('Usuario o contraseña incorrecto');
        } else {
          const authUser = response[0];
          localStorage.setItem('token', authUser.token);
          localStorage.setItem('role', authUser.role);
          this.currentUserRole = authUser.role;
          this._authUser$.next(authUser);
          this.router.navigate(['dashboard', 'home']);
        }
      },
      error: (err) => {
        alert('Error al iniciar sesion')
      }
    });
  }

  logout(){
    localStorage.clear();
    // localStorage.removeItem('token');
    // this._authUser$.next(null);
    this.router.navigate(['auth','login']);
  }

  verifyToken(): Observable<boolean> {
    const token =localStorage.getItem('token');
    if (!token) {
      return of(false)
    }
    return this.http.get<User[]>(environment.apiUrl + 'users', {
      params: {
        token: token,
      },
    }).pipe(
      map((response)=>{
        if (!response.length) {
          return false;
        } else{
          const authUser = response[0];
          localStorage.setItem('token', authUser.token);
          this._authUser$.next(authUser);
          //BORRAR luego
          console.log("este es el authUser", authUser)
          console.log("este es el _authUser$", this._authUser$)
        
          return true;
        }
      })
    )
  }

  getUserRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

}

 