import { createReducer, on } from '@ngrx/store';
import * as StudentsActions from './students.actions';
import { StudentsInterface } from '../../features/dashboard/models';

export interface StudentsState {
  students: StudentsInterface[];
  loading: boolean;
  error: string | null;
}

const initialState: StudentsState = {
  students: [],
  loading: false,
  error: null
};

export const studentsReducer = createReducer(
  initialState,
  on(StudentsActions.loadStudents, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(StudentsActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    students,
    loading: false,
    error: null
  })),
  on(StudentsActions.loadStudentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
