import { createAction, props } from '@ngrx/store';
import { StudentsInterface } from '../../features/dashboard/models';

export const loadStudents = createAction('[Students] Load Students');

export const loadStudentsSuccess = createAction(
  '[Students] Load Students Success',
  props<{ students: StudentsInterface[] }>()
);

export const loadStudentsFailure = createAction(
  '[Students] Load Students Failure',
  props<{ error: string }>()
);
