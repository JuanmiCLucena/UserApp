import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = [];

  private url: string = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  findAll(): Observable<User[]> {
    // return of(this.users);
    // LLamada a backend y mapeamos la data a un arreglo de User

    // return  this.http.get('http://localhost:8080/api/users').pipe(
    //   map(users => users as User[])
    // );

    // Más fácil
    return this.http.get<User[]>(this.url);
  }

  findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }
}
