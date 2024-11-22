import { Injectable } from '@angular/core';
import { InstructorSubject } from '../models/InstructorSubject';
import { BehaviorSubject } from 'rxjs';
import { Subject } from '../models/Subject';

@Injectable({
  providedIn: 'root'
})
export class CourseholdService {
  private selectedCourseSource = new BehaviorSubject<InstructorSubject >(new InstructorSubject);
  selectedCourse$ = this.selectedCourseSource.asObservable();

  setSelectedCourse(course: InstructorSubject) {
    this.selectedCourseSource.next(course);
  }

  
}
