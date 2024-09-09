import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { selectAuthRole } from '../../core/auth/auth.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/state/app.state';
import { Observable } from 'rxjs';
import { selectUserName } from '../../core/auth/auth.selectors'; 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
 
  currentUserRole: string | null = null;

  showFiller = false;
  nombreUsuario$!: Observable<string | null | undefined>;


  constructor(private authService: AuthService, private store :Store, private storeApp: Store<AppState>){}
    
  logout(){
      this.authService.logout();
    };

    ngOnInit() {
      // this.currentUserRole = this.authService.getUserRole();
      this.store.select(selectAuthRole).subscribe(role => {
        this.currentUserRole = role;
      });
      this.nombreUsuario$ = this.storeApp.select(selectUserName);
    }
  
    // Ejemplo de función que bloquea acciones para usuarios 'user'
    canEditClasses(): boolean {
      return this.currentUserRole === 'admin';
    }

    // obtenerNombre(){
    //   console.log('obtenerNombre', (this.nombreUsuario = localStorage.getItem('nombre')) )
    //   return this.nombreUsuario = localStorage.getItem('nombre');
    // }
}
