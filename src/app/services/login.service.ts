import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { data } from 'jquery';
import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedIn = false;
  private studentEmail: string | null = null;
  private readonly apiUrl = 'https://localhost:7288/api/Auth/login'; 

  constructor(private http: HttpClient) { }

  // Method to authenticate a student with email and password
  login(logindata:Login):Observable<any>{
    return this.http.post<any>("https://localhost:7288/api/Auth/login", logindata).pipe(
      tap(response => {
        this.isLoggedIn = true; 
        localStorage.setItem('authToken', response.token.data.token);  // Store the token for session persistence
      }), 
      catchError(() => {
        // Handle login failure
        this.isLoggedIn = false;
        return of(false); // Return false to indicate failed login
      })
    )
  }

  // Method to check if a user is authenticated
  isAuthenticated(): boolean {
    return this.isLoggedIn || !!localStorage.getItem('authToken');
  }

  // Method to log out the student
  logout(): void {
    this.isLoggedIn = false;
    this.studentEmail = null;
    localStorage.removeItem('authToken');
  }

  // Method to get the currently logged-in student's email
  getStudentEmail(): string | null {
    return this.studentEmail;
  }
}
