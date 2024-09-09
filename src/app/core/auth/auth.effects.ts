
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login({ email: action.email, password: action.password }).pipe(
          map(authUser => {
            if (authUser) {
              localStorage.setItem('token', authUser.token);
              localStorage.setItem('role', authUser.role);
              localStorage.setItem('name', authUser.nombre);
              return AuthActions.loginSuccess({ token: authUser.token, role: authUser.role });
            } else {
              return AuthActions.loginFailure({ error: 'Usuario o contraseña incorrecto' });
            }
          }),
          catchError(error => of(AuthActions.loginFailure({ error: 'Login Failed' })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => {
        this.router.navigate(['dashboard', 'home']);
      })
    ), 
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        localStorage.clear();
        this.router.navigate(['auth', 'login']);
      })
    ),
    { dispatch: false }
  );
}

