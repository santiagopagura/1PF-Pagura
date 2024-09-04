import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CoursesComponent } from './features/dashboard/courses/courses.component';
import { StudentsComponent } from './features/dashboard/students/students.component';
import { CourseDetailComponent } from './features/dashboard/courses/pages/course-detail/course-detail.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { authGuard } from './core/guards/auth.guard';


const routes: Routes = [
  // antigua forma de hacerlo
  // {
  //   path: 'auth',
  //   component: LoginComponent,
  // },
  {
    path: 'auth',
    // component: HomeComponent,
    loadChildren: ()=>import('./features/auth/auth.module').then((referenciaAlArchivo)=>referenciaAlArchivo.AuthModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    loadChildren: ()=>import('./features/dashboard/dashboard.module').then((m)=>m.DashboardModule),
  },
  {
    path:'**',
    redirectTo: 'auth',
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
