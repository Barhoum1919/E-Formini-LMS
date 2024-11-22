import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private http:HttpClient) { 
  }
  private readonly apiURL="https://localhost:7288/api"
  getInstructors(){
    return this.http.get(`${this.apiURL}/Instructor`);
    }
  getInstructor(id:string){
    return this.http.get(`${this.apiURL}/${id}`);
  }
  getSubjectInstructor(subjectId:string){
  return this.http.get(`${this.apiURL}/Subject/${subjectId}`)
  }
  
}
