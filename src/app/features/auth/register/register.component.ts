import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegisterService } from '../../../core/services/register.service';
import { interval, Observable, Subscription, take } from 'rxjs';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  books: any[] = [];

  // Aplicando rxjs
  // myRandomNumber$ = new Observable<number> ((subscriber) => {
  //   let counter = 0;
  //   setInterval(()=>{
  //     counter++;
  //     subscriber.next(counter);
  //   }, 1000);
  // });


  myRandomNumberSubscription?: Subscription;

  myInterval$ = interval(1000);
  
  valorContador = 0;

  constructor(private bookService: RegisterService) {
  
  this.myRandomNumberSubscription= this.myInterval$
  .pipe(take(5))
  .subscribe({
    next:(randomNumber)=>{
      console.log(randomNumber);
      this.valorContador = randomNumber;
    },
  })
    
  }
  ngOnDestroy(): void {
    this.myRandomNumberSubscription?.unsubscribe();
  }

  
  ngOnInit() {
    this.bookService.getBooks().then(data => {
      this.books=data;
    });
  }

 
}