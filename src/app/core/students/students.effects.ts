import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StudentsService } from '../services/students.service';
import * as StudentsActions from './students.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class StudentsEffects {
  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      mergeMap(() =>
        this.studentsService.getStudents().pipe(
          map(students => StudentsActions.loadStudentsSuccess({ students })),
          catchError(error => of(StudentsActions.loadStudentsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private studentsService: StudentsService) {}
}
