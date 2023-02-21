import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Chef } from '../Models/chef.model';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChefService {
  APIURL = environment.URL_API;
  private _refresh$ = new Subject<void>();
  private obtenerChefs = this.APIURL+'/chef/info';
  private crearChef = this.APIURL+'/chef/';
  private obtenerChef = this.APIURL+'/chef/info/';
  private modificarChef = this.APIURL+'/chef/update/'
  private eliminarChef = this.APIURL+'/chef/delete/'

  constructor(private http: HttpClient) { }
  get_refresh$() {
    return this._refresh$;
  }
  getChefs(): Observable<Chef[]> {
    return this.http.get<Chef[]>(this.obtenerChefs).pipe(retry(3), catchError(this.handleError))
  }
  addChefs(chef: Chef): Observable<Chef> {
    return this.http.post<Chef>(this.crearChef, chef).pipe(catchError(this.handleError)).pipe(tap(() => {
      this._refresh$.next();
    }
    ));
  }
  getOneChef(id: number): Observable<Chef[]> {
    return this.http.get<Chef[]>(this.obtenerChef + id).pipe(retry(3), catchError(this.handleError))
  }
  updateChef(chef: Chef): Observable<Chef> {
    return this.http.put<Chef>(this.modificarChef + chef.id, chef).pipe(catchError(this.handleError)).pipe(tap(() => {
      this._refresh$.next();
    }
    ));
  }
  deleteChef(chef:Chef): Observable<Chef[]> {
    return this.http.delete<Chef[]>(this.eliminarChef + chef.id).pipe(retry(3), catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      console.error('An error occurred:', error.error);
    } else {
      console.error('El backend devolvió el código ${error.status}, el cuerpo era:', error.error)
    }
    return throwError(() => new Error('Algo malo sucedió; por favor, inténtelo de nuevo más tarde.'));
  }
}
