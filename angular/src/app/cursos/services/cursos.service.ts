import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, take, tap } from 'rxjs';

import { Curso } from '../model/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  // private readonly API = '/assets/cursos.json';
  // private readonly API = 'http://localhost:8080/api/courses';
  private readonly API = 'api/courses/';

  constructor(private httpClient: HttpClient) { }

  //listaCursos(): Curso[] {
  listaCursos() {
    //return this.httpClient.get(this.API);
    return this.httpClient.get<Curso[]>(this.API)
      .pipe(
        take(1),
        tap(cursos => console.log(cursos))
      );
  }

  save(registro: Curso): Observable<Curso>{
    return this.httpClient.post<Curso>(this.API, registro).pipe(first()); //pipe é boa pratica
  }

  update(registro: Curso){
    return this.httpClient.put<Curso>(this.API, registro).pipe(first());
  }

  delete(registro: Curso){
    return this.httpClient.delete(this.API+registro._id);
  }
}
