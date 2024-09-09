


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

  // El método login ahora devuelve un Observable
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
        return null;  // Devuelve null si no hay coincidencia
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['auth', 'login']);  // Opción de redirección
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
















// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable, of } from 'rxjs';
// import { User } from '../../features/dashboard/models';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';
// import { map, tap } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private _authUser$ = new BehaviorSubject<User | null >(null);
//   authUser$ = this._authUser$.asObservable();
//   private currentUserRole: string | null = null;

//   constructor(private http: HttpClient, private router: Router) { }

//   // Modificación: El método login devuelve un Observable
//   login(data: { email: string; password: string }): Observable<User | null> {
//     return this.http.get<User[]>(environment.apiUrl + 'users', {
//       params: {
//         email: data.email,
//         password: data.password,
//       }
//     }).pipe(
//       map((response) => {
//         if (!response.length) {
//           alert('Usuario o contraseña incorrecto');
//           return null;
//         } else {
//           const authUser = response[0];
//           localStorage.setItem('token', authUser.token);
//           localStorage.setItem('role', authUser.role);
//           this.currentUserRole = authUser.role;
//           this._authUser$.next(authUser);
//           return authUser;
//         }
//       }),
//       tap((authUser) => {
//         if (authUser) {
//           this.router.navigate(['dashboard', 'home']);
//         }
//       })
//     );
//   }

//   logout() {
//     localStorage.clear();
//     this.router.navigate(['auth', 'login']);
//   }

//   verifyToken(): Observable<boolean> {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       return of(false);
//     }
//     return this.http.get<User[]>(environment.apiUrl + 'users', {
//       params: {
//         token: token,
//       },
//     }).pipe(
//       map((response) => {
//         if (!response.length) {
//           return false;
//         } else {
//           const authUser = response[0];
//           localStorage.setItem('token', authUser.token);
//           this._authUser$.next(authUser);
//           return true;
//         }
//       })
//     );
//   }

//   getUserRole(): string | null {
//     return localStorage.getItem('role');
//   }

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('token');
//   }
// }




// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, map, Observable, of } from 'rxjs';
// import { User } from '../../features/dashboard/models';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../../../environments/environment';

// @Injectable({
//   providedIn: 'root'
// })


// export class AuthService {

//   private _authUser$ = new BehaviorSubject<User | null >(null);
//   authUser$ =this._authUser$.asObservable() 
//   private currentUserRole: string | null = null;


//   constructor(private http:HttpClient, private router: Router) { }

//   login(data:{email:string, password: string}) {
//     this.http.get<User[]>(environment.apiUrl + 'users',{
//       params:{
//         email: data.email,
//         password: data.password,
//       }
//     }).subscribe({
//       next: (response) => {
//         if (!response.length) {
//           alert('Usuario o contraseña incorrecto');
//         } else {
//           const authUser = response[0];
//           localStorage.setItem('token', authUser.token);
//           localStorage.setItem('role', authUser.role);
//           this.currentUserRole = authUser.role;
//           this._authUser$.next(authUser);
//           this.router.navigate(['dashboard', 'home']);
//         }
//       },
//       error: (err) => {
//         alert('Error al iniciar sesion')
//       }
//     });
//   }

//   logout(){
//     localStorage.clear();
//     // localStorage.removeItem('token');
//     // this._authUser$.next(null);
//     this.router.navigate(['auth','login']);
//   }

//   verifyToken(): Observable<boolean> {
//     const token =localStorage.getItem('token');
//     if (!token) {
//       return of(false)
//     }
//     return this.http.get<User[]>(environment.apiUrl + 'users', {
//       params: {
//         token: token,
//       },
//     }).pipe(
//       map((response)=>{
//         if (!response.length) {
//           return false;
//         } else{
//           const authUser = response[0];
//           localStorage.setItem('token', authUser.token);
//           this._authUser$.next(authUser);
//           //BORRAR luego
//           console.log("este es el authUser", authUser)
//           console.log("este es el _authUser$", this._authUser$)
        
//           return true;
//         }
//       })
//     )
//   }

//   getUserRole(): string | null {
//     return localStorage.getItem('role');
//   }

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('token');
//   }

// }

 