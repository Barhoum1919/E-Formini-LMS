import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../models/UserRegister';
import { Observable, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { Student } from '../models/Student';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { 
  }
  
  private readonly apiUrl="https://localhost:7288/api/Auth/register"

  UserRegistration(student:Student){
    return this.http.post(`${this.apiUrl}`,student);
  }
  /*getUsers(){
    return this.http.get('https://localhost:7288/api/Student');
  }*/
  getUser(): Observable<any> {
    const token = localStorage.getItem('authToken');  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.get<any>('https://localhost:7288/api/Auth/userProfile', { headers }).pipe(
      tap(response => {    
        localStorage.setItem('UserId',response.id);
        //console.log(response.id);
      }));
  }


  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError('Something went wrong; please try again later.');
  }
}
