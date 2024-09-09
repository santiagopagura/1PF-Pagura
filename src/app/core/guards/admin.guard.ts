
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectAuthState } from '../auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private store: Store, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectAuthState).pipe(
      map(authState => {
        const isAdmin = authState?.role === 'admin';
        if (!isAdmin) {
          this.router.navigate(['/not-authorized']);
        }
        return isAdmin;
      })
    );
  }
}
