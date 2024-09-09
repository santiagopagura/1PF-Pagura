
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';
import { AppState } from '../state/app.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  state => state.isAuthenticated
);

export const selectAuthToken = createSelector(
  selectAuthState,
  state => state.token
);

export const selectAuthRole = createSelector(
  selectAuthState,
  state => state.role
);

export const selectAuthError = createSelector(
  selectAuthState,
  state => state.error
);

export const selectUserName = createSelector(
  selectAuthState,
  (authState: AuthState) => authState.user?.name 
);

