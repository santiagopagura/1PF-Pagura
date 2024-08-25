import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { concatMap, debounceTime, delay, distinctUntilChanged, forkJoin, interval, map, Observable, of, retry, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { clasesInterface, CursosInterface, StudentsInterface } from '../models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClasesService } from '../../../core/services/clases.service';
import { query } from '@angular/animations';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.scss'
})
export class ClasesComponent implements OnInit {
  
  linkForm: FormGroup;
  courses: CursosInterface[] = [];
  students$: Observable<StudentsInterface[]> = new Observable();
  selectedStudents: StudentsInterface[] = [];
  selectedCourseId: string | null = null;
  students: StudentsInterface[]=[];
  classes: clasesInterface[] = [];


  constructor(
    private fb: FormBuilder,
    private courseStudentService: ClasesService
  ) {
    this.linkForm = this.fb.group({
      course: ['', Validators.required],
      studentSearch: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCourses();


    this.students$ = this.linkForm.get('studentSearch')!.valueChanges.pipe(
      debounceTime(500),  
      distinctUntilChanged(),  
      switchMap(query => {
        console.log('Valor de query:', query); 
        return this.courseStudentService.searchStudents(query);
      })
    );

    this.linkForm.get('course')!.valueChanges.subscribe(courseId => {
      this.selectedCourseId = courseId;
      this.loadStudentsByCourse(courseId);
    });

  }

  loadCourses() {
    this.courseStudentService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }


  // loadStudentsByCourse(courseId: string) {
  //   if (courseId) {
  //     console.log("aca veo el students en courseId", courseId)
  //     this.courseStudentService.getStudentsByCourse(courseId).subscribe(data => {
  //       this.students = data;

  //       console.log("aca veo el students en loadstudentsbycourse", this.students);
  //       this.courseStudentService.getStudentsData(this.students.name).subscribe();
        
  //       // this.courseStudentService.getStudentsData(this.students);
  //     });
  //   }
  // }
  
loadStudentsByCourse(courseId: string) {
  if (courseId) {
    console.log("aca veo el students en courseId", courseId)
    this.courseStudentService.getStudentsByCourse(courseId).subscribe(data => {
      this.classes = data;
      
      console.log("aca veo el students en loadstudentsbycourse  CLASSES", this.classes);
      
      const studentDataObservables = this.classes.map(classes => 
        this.courseStudentService.getStudentsData(classes.studentId)
      );
    

      forkJoin(studentDataObservables).subscribe(studentsDataArray => {
        const studentsData = studentsDataArray.flat();  
        console.log("Datos de estudiantes obtenidos:", studentsData);
        this.students = studentsData; 
      });



    });
  }
}


  addStudent(student: any) {
    if (!this.selectedStudents.some(s => s.id === student.id)) {
      this.selectedStudents.push(student);
    }
    this.linkForm.get('studentSearch')!.reset();
  }



  linkStudentsToCourse() {
    const courseId = this.linkForm.get('course')!.value;
  
    this.selectedStudents.forEach(student => {
      this.courseStudentService.linkStudentToCourse(courseId, student.id).subscribe({
        next: (response) => {
          console.log(`Student ${student.name} linked to course.`);
        },
        error: (error) => {
          console.error(`Failed to link student ${student.name}.`);
        },
        complete: () => {
          console.log('All students linked successfully');
          this.selectedStudents = [];
          this.linkForm.reset();
        }
      });
    });
  }


  removeStudent(student: any) {
    const index = this.selectedStudents.indexOf(student);
    if (index >= 0) {
      this.selectedStudents.splice(index, 1);
    }
  }
  
}
  
  