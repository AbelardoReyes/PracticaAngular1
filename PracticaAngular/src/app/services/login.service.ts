import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { Usuario } from '../Models/usuario.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  APIURL = environment.URL_API + "/usuario"
  private _refresh$ = new Subject<void>();
  private crearUsuario = this.APIURL + '/crear'
  private obtenerRutaSigned = this.APIURL + '/codigo'
  private logearUsuario = this.APIURL + '/login'
  private logoutUsuario = this.APIURL + '/logout'
  private infoUsuario = this.APIURL + '/info'
  private actualizarUsuario = this.APIURL + '/update'
  private verificacion = environment.URL_API + '/verify'
  private codigo = environment.URL_SIGNED


  constructor(private http: HttpClient) { }
  token: string = '';
  get_refresh$() {
    return this._refresh$;
  }
  //Peticiones para registrarse
  getRutaSigned(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.obtenerRutaSigned).pipe(retry(3), catchError(this.handleError))
  }
  enviarCodigo(usuario: Usuario, url: string): Observable<Usuario> {
    return this.http.post<Usuario>(url, usuario).pipe(catchError(this.handleError)).pipe(tap(() => {
      this._refresh$.next();
    }
    ));
  }
  //Peticiones para logearse
  login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<{ token: string }>(this.logearUsuario, usuario).pipe(
      map(response => {
        this.token = response.token;
        return usuario;
      })
    );
  }
  getHeaders() {
    return { Authorization: `Bearer ${this.token}` };
  }

  logout(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.logoutUsuario, usuario).pipe(catchError(this.handleError)).pipe(tap(() => {
      this._refresh$.next();
    }
    ));
  }
  //Crud de Usuarios
  getInfoUsuario(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.infoUsuario).pipe(retry(3), catchError(this.handleError))
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.crearUsuario, usuario).pipe(catchError(this.handleError)).pipe(tap(() => {
      this._refresh$.next();
    }
    ));
  }
  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.actualizarUsuario, usuario).pipe(catchError(this.handleError)).pipe(tap(() => {
      this._refresh$.next();
    }
    ));
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
