import { Component } from '@angular/core';
import { CoursesService } from '../../../../../core/services/courses.service';
import { Observable } from 'rxjs';
import { CursosInterface } from '../../../models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent {
  
  curso$: Observable<CursosInterface | undefined> ;

  
  constructor(private coursesService : CoursesService, private activatedRoute: ActivatedRoute) {
    this.curso$ = this.coursesService.getCourseById(this.activatedRoute.snapshot.params['id']);
    console.log('este es el curso ' + this.curso$);
  }

}

