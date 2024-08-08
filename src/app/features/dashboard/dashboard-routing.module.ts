import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CoursesComponent } from './courses/courses.component';
import { CourseDetailComponent } from './courses/pages/course-detail/course-detail.component';
import { StudentsComponent } from './students/students.component';

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
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
