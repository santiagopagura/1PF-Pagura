import { Component, OnDestroy, OnInit } from '@angular/core';
import { CoursesService } from '../../../core/services/courses.service';
import { concatMap, debounceTime, delay, forkJoin, interval, map, Observable, of, retry, Subject, Subscription, takeUntil } from 'rxjs';
import { CursosInterface } from '../models';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrl: './clases.component.scss'
})
export class ClasesComponent implements OnInit, OnDestroy {
  // myRandomNumber$ = new Observable<number>((subscriber) => {
  //   let counter = 0;
  //   setInterval(() => {
  //     counter++;
  //     subscriber.next(counter);
  //   }, 1000);
  // });

  myInterval$ = interval(1500);

  obtenerNombreUsuario$ = of('Mariano').pipe(delay(1000));

  obtenerNombreUsuario2$ = new Observable((subscriber) => {
    setTimeout(() => {
      subscriber.next('Mariano');
    }, 1000);
  });

  myRandomNumberSubscription?: Subscription;

  // valorContador = 0;

  loading = false;
  cursos$: Observable<CursosInterface[]>;

  profesores$: Observable<string[]> = of(['Martin', 'Mariana', 'Jhoana']).pipe(
    delay(3000)
  );

  profesores: string[] = [];
  cursos: CursosInterface[] = [];

  searchControl: FormControl;

  subscriptionToSearchControlValueChanges?: Subscription;
  subscriptions: Subscription[] = [];
  isDestroyed$ = new Subject<void>();

  constructor(private coursesService: CoursesService, private fb: FormBuilder) {
    this.searchControl = this.fb.control('');

    this.cursos$ = coursesService.getCourses();
    this.loading = true;

    // this.myRandomNumberSubscription = this.myInterval$
    //   .pipe(
    //     // take(20),
    //     // filter((valor) => valor > 5)
    //     // skip(1),
    //     // first()
    //     // take(1)
    //     tap((valor) => console.log('Valor antes del map: ', valor)),
    //     map((valor) => valor * 2),
    //     tap((valor) => console.log('Valor despues del map: ', valor))
    //   )
    //   .subscribe({
    //     // Es cuando recibimos un valor (sin error)
    //     next: (randomNumber) => {
    //       console.log(randomNumber);
    //       this.valorContador = randomNumber;
    //     },
    //     // Cuando emite un error
    //     error: () => {},
    //     // Cuando el observable va a dejar de emitir valores (se completa)
    //     complete: () => {},
    //   });
  }

  ngOnInit(): void {
    this.obtenerNombreUsuario$.subscribe({
      next: (v) => console.log(v),
    });
    forkJoin([this.cursos$, this.profesores$]).subscribe({
      next: (resultados) => {
        this.profesores = resultados[1];
        this.cursos = resultados[0];
      },
      complete: () => {
        this.loading = false;
      },
    });
    this.loadProfesoresAndCursosConcat();
    // this.probandoRetry();
    this.subscribeToSearchControlValueChanges();
  }

  // probandoRetry(): void {
  //   new Observable((subs) => {
  //     subs.next(1);
  //     subs.next(2);
  //     subs.next(3);
  //     subs.error('Hello, soy un error');
  //   })
  //     .pipe(retry(3))
  //     .subscribe({
  //       next: (v) => {
  //         console.log(v);
  //       },
  //       error: (err) => {
  //         console.error(err);
  //       },
  //     });
  // }

  subscribeToSearchControlValueChanges(): void {
    this.subscriptions.push(
      this.searchControl.valueChanges
        .pipe(
          debounceTime(500),
          concatMap((value) => this.coursesService.searchCoursesByName(value)),
          takeUntil(this.isDestroyed$)
        )
        .subscribe({
          next: (results) => {
            console.log(results);
          },
        })
    );
  }

  loadProfesoresAndCursosConcat(): void {
    this.profesores$
      .pipe(
        concatMap((profesores) => {
          return this.cursos$.pipe(map((cursos) => ({ cursos, profesores })));
        })
      )
      .subscribe({
        next: (cursosYProfesores) => { 
          console.log('loadProfesoresAndCursosConcat', cursosYProfesores);
        },
      });
  }
  // this.cursos$.subscribe({
  //   next: (cursos) => {
  //     console.log('loadProfesoresAndCursosConcat', cursos);
  //   },
  // });

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());

    this.isDestroyed$.next();

    // ngOnDestroy es un ciclo de vida de angular que se ejecuta cada vez que el componente
    // es destruido (sale de la pantalla)
    // this.myRandomNumberSubscription?.unsubscribe();
  }
}