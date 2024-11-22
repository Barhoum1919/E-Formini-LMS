import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseRegistration } from '../models/CourseRegistration';

@Injectable({
  providedIn: 'root'
})
export class CourseRegistrationService {

  constructor(private http:HttpClient) { }

  addCourse(courseRegistration: CourseRegistration) {
    // Set the EnrollmentDate to the current date and time in ISO format
    courseRegistration.EnrollementDate = new Date().toISOString();
  
    // Send the request with the correct property names
    return this.http.post('https://localhost:7288/api/Registration', {
      userId: courseRegistration.UserId,
      subjectId: courseRegistration.SubjectId,
      enrollmentDate: courseRegistration.EnrollementDate
    });
  }

  getCourses(userId:string){
    return this.http.get(`https://localhost:7288/api/Registration/user/${userId}/courses`);
  }
}
