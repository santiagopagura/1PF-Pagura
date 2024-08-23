import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { CoursesComponent } from './courses/courses.component';
// import { CourseDetailComponent } from './courses/pages/course-detail/course-detail.component';
// import { StudentsComponent } from './students/students.component';
import { ClasesComponent } from './clases/clases.component';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'courses',
    loadChildren: ()=>import('./courses/courses.module').then((m)=>m.CoursesModule),
  },
  {
    path:'courses/:id',
    loadChildren: ()=>import('./courses/components/course-dialog/course-dialog.component').then((m)=>m.CourseDialogComponent),
  },
  {
    path: 'students',
    loadChildren:()=>import('./students/students.module').then((m)=>m.StudentsModule),
  },
  {
    path: 'clases',
    component: ClasesComponent,
    canActivate: [adminGuard],
    loadChildren:()=>import('./clases/clases.module').then((m)=>m.ClasesModule),
  },
  { path: 'register', 
    loadChildren:()=>import('./register/register.module').then((m)=>m.RegisterModule) 
  },
  { path: 'professors', 
    loadChildren:()=>import('./professors/professors.module').then((m)=>m.ProfessorsModule) 
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
