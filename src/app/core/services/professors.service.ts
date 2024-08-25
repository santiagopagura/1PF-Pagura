import { Injectable } from '@angular/core';
import { ProfessorsInterface } from '../../features/dashboard/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfessorsService {


  addProfessor(professor: ProfessorsInterface): Observable<ProfessorsInterface[]> {
    return this.httpClient.post<ProfessorsInterface[]>((environment.apiUrl + 'professors'), professor)
  }

  getProfessors():Observable<ProfessorsInterface[]> {
    return this.httpClient.get<ProfessorsInterface[]>(environment.apiUrl + 'professors');
  }


  editProfessorById(id: string, update: ProfessorsInterface) {
    return this.httpClient.put(environment.apiUrl + 'professors/' + id, update);
  }

  deleteProfessorByID(id:string, professorName:string) {
    return  this.httpClient.delete(environment.apiUrl + 'professors/' + id);
  }


  constructor(private httpClient: HttpClient) { }
}

