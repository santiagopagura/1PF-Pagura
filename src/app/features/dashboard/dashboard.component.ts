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
  
  nombreUsuario: string = '';

  constructor(private authService: AuthService, private store :Store, private storeApp: Store<AppState>){
    
    const nombre = localStorage.getItem('name');
    if (nombre) {
      this.nombreUsuario = nombre;
    }
    console.log("nombre de usuarururururur" + this.nombreUsuario )
  }
    
  logout(){
      this.authService.logout();
    };

    ngOnInit() {
      // this.currentUserRole = this.authService.getUserRole();
      this.store.select(selectAuthRole).subscribe(role => {
        this.currentUserRole = role;
      });
     
    }

    canEditClasses(): boolean {
      return this.currentUserRole === 'admin';
    }

}
