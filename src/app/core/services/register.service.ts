import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

    private books = [
      { id: 1, title: 'Libro A', author: 'Autor A' },
      { id: 2, title: 'Libro B', author: 'Autor B' },
      { id: 3, title: 'Libro C', author: 'Autor C' }
    ];
  
    constructor() {}
  
    // Devuelve un Observable que emite la lista de libros
    getBooks(): Promise<any[]> {
      return Promise.resolve(this.books);
    }
  
  }