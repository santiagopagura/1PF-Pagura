import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthRoutingModule } from './features/auth/auth-routing.module';
import { AuthModule } from './features/auth/auth.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Importa los reducers y efectos adicionales (ejemplo: students)
import { authReducer } from './core/auth/auth.reducer';
import { AuthEffects } from './core/auth/auth.effects';
import { studentsReducer } from './core/students/students.reducer';
import { StudentsEffects } from './core/students/students.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    AuthModule,  // Si usas AuthModule como módulo independiente

    // Configuración del StoreModule con múltiples características
    StoreModule.forRoot({ auth: authReducer }),  // Agrega los reducers principales
    StoreModule.forFeature('students', studentsReducer),  // Agrega reducers para otras features

    EffectsModule.forRoot([AuthEffects]),  // Efectos principales
    EffectsModule.forFeature([StudentsEffects]),  // Efectos adicionales para otras características

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }









// import { NgModule, isDevMode } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { DashboardModule } from './features/dashboard/dashboard.module';
// import { AuthRoutingModule } from './features/auth/auth-routing.module';
// import { AuthModule } from './features/auth/auth.module';
// import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
// import { provideNativeDateAdapter } from '@angular/material/core';
// import { provideHttpClient, withFetch } from '@angular/common/http';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { authReducer } from './core/auth/auth.reducer';
// import { AuthEffects } from './core/auth/auth.effects';



// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     AuthRoutingModule,
//     StoreModule.forRoot({ auth: authReducer }),
//     EffectsModule.forRoot([AuthEffects]),
//     StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
//   ],
//   providers: [
//     provideAnimationsAsync(),
//     provideNativeDateAdapter(),
//     {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
//     provideHttpClient(withFetch()),
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }
