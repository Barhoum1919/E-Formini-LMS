import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http:HttpClient) { 
  }
  private readonly apiURL="https://localhost:7288/api"
  getSubjects(){
    return this.http.get(`${this.apiURL}/Subject`);
    }
  getSubject(id:string){
    return this.http.get(`${this.apiURL}/${id}`);
  }
  
  
}
