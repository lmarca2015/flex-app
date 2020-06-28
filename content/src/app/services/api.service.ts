import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie, InfoMovie } from '../interface/movie';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private API_KEY = '724dac7b5b2bffa2537fd98de12fd726';
  private REST_API_SERVER = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.API_KEY}&language=es-PE&page=`;
  public URL_BASE = 'https://afiliaciones.mc.com.pe:8443/WSAfiliacion/api/appmovil/login';

  //const url = `${this.heroesUrl}/${id}`;
  constructor(private http: HttpClient) { }

  fetchMovies() {
    return this.http.get<Movie>(this.REST_API_SERVER);
  }

  /** GET heroes from the server */
  // getMovies(): Observable<InfoMovie[]> {
  //   return this.http.get<InfoMovie[]>(this.REST_API_SERVER)
  // }


  getMovies(page: number): Observable<InfoMovie> {
    return this.http.get<InfoMovie>(`${this.REST_API_SERVER}${page}`)
  }

  login(usuario: string, password: string): Observable<Usuario> {

    let postData = {
      usuario : usuario,
      password : password
    }

    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'  
    });
    let options = {
      headers: httpHeaders
    };
    return this.http.post<Usuario>(this.URL_BASE, postData, options);
  }

}
