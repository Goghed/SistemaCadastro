import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Estudante } from './estudante';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class EstudanteService {

  private estudantesUrl = 'api/estudantes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET estudantes from the server */
  getestudantes(): Observable<Estudante[]> {
    return this.http.get<Estudante[]>(this.estudantesUrl)
      .pipe(
        tap(_ => this.log('Buscou estudantes')),
        catchError(this.handleError<Estudante[]>('getestudantes', []))
      );
  }

  /** GET estudante by id. Return `undefined` when id not found */
  getEstudanteNo404<Data>(id: number): Observable<Estudante> {
    const url = `${this.estudantesUrl}/?id=${id}`;
    return this.http.get<Estudante[]>(url)
      .pipe(
        map(estudantes => estudantes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `Busca de estudante` : `não encontrada`;
          this.log(`${outcome} estudante id=${id}`);
        }),
        catchError(this.handleError<Estudante>(`getEstudante id=${id}`))
      );
  }
  
  getEstudante(id: number): Observable<Estudante> {
    const url = `${this.estudantesUrl}/${id}`;
    return this.http.get<Estudante>(url).pipe(
      tap(_ => this.log(`Encontrado estudante com id=${id}`)),
      catchError(this.handleError<Estudante>(`getEstudante id=${id}`))
    );
  }

  /* GET estudantes whose nome contains search term */
  searchestudantes(term: string): Observable<Estudante[]> {
    if (!term.trim()) {
      // if not search term, return empty estudante array.
      return of([]);
    }
    return this.http.get<Estudante[]>(`${this.estudantesUrl}/?nome=${term}, ${this.estudantesUrl}/?curso=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found estudantes matching "${term}"`) :
         this.log(`no estudantes matching "${term}"`)),
      catchError(this.handleError<Estudante[]>('searchestudantes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new estudante to the server */
  addEstudante(estudante: Estudante): Observable<Estudante> {
    return this.http.post<Estudante>(this.estudantesUrl, estudante, this.httpOptions).pipe(
      tap((newEstudante: Estudante) => this.log(`Estudante adicionado com o id=${newEstudante.id}`)),
      catchError(this.handleError<Estudante>('addEstudante'))
    );
  }

  /** DELETE: delete the estudante from the server */
  deleteEstudante(id: number): Observable<Estudante> {
    const url = `${this.estudantesUrl}/${id}`;

    return this.http.delete<Estudante>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Estudante apagado com o id=${id}`)),
      catchError(this.handleError<Estudante>('deleteEstudante'))
    );
  }

  /** PUT: update the estudante on the server */
  updateEstudante(estudante: Estudante): Observable<any> {
    return this.http.put(this.estudantesUrl, estudante, this.httpOptions).pipe(
      tap(_ => this.log(`Estudante atualizado com o id=${estudante.id}`)),
      catchError(this.handleError<any>('updateEstudante'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - nome of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a EstudanteService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`EstudanteService: ${message}`);
  }
}
