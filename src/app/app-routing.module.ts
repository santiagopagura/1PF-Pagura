import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CoursesComponent } from './features/dashboard/courses/courses.component';
import { StudentsComponent } from './features/dashboard/students/students.component';
import { CourseDetailComponent } from './features/dashboard/courses/pages/course-detail/course-detail.component';
import { HomeComponent } from './features/dashboard/home/home.component';


const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {path:'courses/:id',
        component: CourseDetailComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
      },
    ]
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
