import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { concatMap, debounceTime, delay, distinctUntilChanged, forkJoin, interval, map, Observable, of, retry, Subject, Subscription, switchMap, takeUntil, tap } from 'rxjs';
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
  selectedCourseId!: string ; 


  students$: Observable<StudentsInterface[]> = new Observable();
  selectedStudents: StudentsInterface[] = [];


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
// Se ocupa de la seleccion de curso
    this.linkForm.get('course')!.valueChanges.subscribe(courseId => {
      this.selectedCourseId = courseId;
      console.log("curso id" , this.selectedCourseId);
      console.log("lalalal" ,this.loadStudentsByCourse(courseId));
      this.selectedStudents = [];
    });
  }

  loadCourses() {
    this.courseStudentService.getCourses().subscribe(data => {
      this.courses = data;
    });
  }

  
loadStudentsByCourse(courseId: string) {
  this.students=[];
  if (courseId) {
    console.log("aca veo el courseId, lo que es el id del courses", courseId)
    this.courseStudentService.getStudentsByCourse(courseId).subscribe(data => {
      this.classes = data;
      
      console.log("array de objetos en base al course id con las classes", this.classes);
      
      const studentDataObservables = this.classes.map(classes => 
        this.courseStudentService.getStudentsData(classes.studentId)
      );
    console.log( "veo el studentdataobs" ,studentDataObservables);

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
      console.log( "estudiantes agregado",student, "listado de studiantes", this.selectedStudents )
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


  removeStudent(student: StudentsInterface): void {
    
      console.log("consol de selectedStudents", this.selectedStudents)

      this.selectedStudents = this.selectedStudents.filter(s => s.id !== student.id); // Actualiza la lista de estudiantes en la vista
      console.log(`Estudiante ${student.name} eliminado exitosamente.`);
  }
  removeStudentfromClasse(student: StudentsInterface, courseId: string): void {
    if (confirm(`¿Estás seguro de que quieres eliminar a ${student.name} ${student.surname} del curso?`)) {
      this.courseStudentService.deleteStudentFromCourse(student.id, courseId).subscribe({
        next: () => {
          // Filtra el array de estudiantes eliminando el que acaba de ser borrado del servidor
          this.students = this.students.filter(s => !(s.id === student.id));
          console.log(`Estudiante ${student.name} eliminado exitosamente del curso ${courseId}.`);
        },
        error: (err) => {
          console.error(`Error al eliminar al estudiante: ${err}`);
        }
      });
    }
  }
  

  // removeStudent(student: StudentsInterface): void {
  //   if (confirm(`¿Estás seguro de que quieres eliminar a ${student.name} ${student.surname} del curso?`)) {
  //     console.log("consol de selectedStudents", this.selectedStudents)
  //     this.courseStudentService.deleteStudentFromCourse(student.id).subscribe({
  //       next: () => {
  //         this.students = this.students.filter(s => s.id !== student.id); // Actualiza la lista de estudiantes en la vista
  //         console.log(`Estudiante ${student.name} eliminado exitosamente.`);
  //       },
  //       error: (err) => {
  //         console.error(`Error al eliminar al estudiante: ${err}`);
  //       }
  //     });
  //   }
  // }


}
  
