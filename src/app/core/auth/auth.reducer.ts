import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  error: string | null;
  user: { name: string } | null;
}

const initialState: AuthState = {
  token: null,
  role: null,
  isAuthenticated: false,
  error: null,
  user: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token, role }) => ({
    ...state,
    token,
    role,
    isAuthenticated: true,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error,
    isAuthenticated: false
  })),
  on(AuthActions.logout, state => ({
    ...state,
    token: null,
    role: null,
    isAuthenticated: false,
    error: null
  }))
);
