import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
 
  currentUserRole: string | null = null;

  showFiller = false;

  constructor(private authService: AuthService){}
    logout(){
      this.authService.logout();
    };

    ngOnInit() {
      this.currentUserRole = this.authService.getUserRole();
    }
  
    // Ejemplo de función que bloquea acciones para usuarios 'user'
    canEditClasses(): boolean {
      return this.currentUserRole === 'admin';
    }
}
