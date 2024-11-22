import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subject } from '../../models/Subject';
import { SubjectService } from '../../services/subject.service';
import { Instructor } from '../../models/Instructor';
import { InstructorService } from '../../services/instructor.service';
import { InstructorSubject } from '../../models/InstructorSubject';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import { CourseRegistrationService } from '../../services/course-registration.service';
import { CourseholdService } from '../../shared/coursehold.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  showFields: boolean[] = [false, false, false, false, false, false, false, false,false];
  subjects!: Subject[];
  showCourses!: Subject[];
  instructorSubject!: Instructor;
  instructor!: Instructor;
  subject!: Subject;
  instructors!: Instructor[];
  showSubjects!: InstructorSubject[];
  InstructorSubject!: InstructorSubject;
  InstructorsSubjects: InstructorSubject[] = [];
  showInsSub!: InstructorSubject[];
  isLoggedIn!:boolean;
  isLoggedOut!:boolean;
  selectedCourse!:any;
  scrollContainer:any;
  constructor(private subjectservice: SubjectService, private instructorservice: InstructorService,
    private router : Router, private courseregister:CourseRegistrationService,
    private courseholdservice:CourseholdService
  ) {}

  ngOnInit(): void {
    this.checkLogin();
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
    this.getSubjects();
    this.getInstructors();
    this.scrollContainer = document.querySelector('.course-scroll-container');
    
  }

  ngAfterViewInit(): void {
    this.showFields.forEach((_, index) => {
      setTimeout(() => {
        this.showFields[index] = true;
      }, index * 950);
    });
  }

  getSubjects() {
    this.subjectservice.getSubjects().subscribe((data: any) => {
      this.subjects = data.resultat.items.map((subject: any) => ({
        ...subject,
        urlImage: `https://localhost:7288/${subject.urlImage}`
      }));
    });
  }

  getInstructors() {
    this.instructorservice.getInstructors().subscribe(
      (data: any) => {
        this.instructors = data.resultat.items.map((instructor: any) => ({
          ...instructor,
          urlImage: `https://localhost:7288/${instructor.urlImage}`
        }));
  
        this.InstructorsSubjects = [];
  
        // Collect observables for each instructor
        const instructorObservables = this.instructors.map((instructor) =>
          this.getInstructorSubject(instructor)
        );
  
        // Wait for all the observables to complete using forkJoin
        forkJoin(instructorObservables).subscribe((instructorSubjects: InstructorSubject[]) => {
          // Push all the results to the InstructorsSubjects array
          this.InstructorsSubjects.push(...instructorSubjects);
          console.log(this.InstructorsSubjects); // Log once all data is fetched
          this.showInsSub = [this.InstructorsSubjects[6],this.InstructorsSubjects[5],this.InstructorsSubjects[4]]
        
        });
        




      }
    );
  }
  getChunks(array: any[], size: number): any[] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }

  getInstructorSubject(instructor: Instructor): Observable<InstructorSubject> {
    return this.instructorservice.getSubjectInstructor(instructor.subjectId).pipe(
      map((data: any) => {
        return {
          instructorName: instructor.name,
          subjectName: data.resultat.name,
          subjectId:data.resultat.id,
          subjectDescription:data.resultat.description,
          urlImage: `https://localhost:7288/${data.resultat.urlImage}`
        };
      })
    );
  }

  /*courseRegister(){
    
    this.courseregister.addCourse().subscribe(
      (data: any) => {
        console.log(data);
        }

    )
  }*/
  
  checkLogin(){
    if(localStorage.getItem('isLoggedIn') === 'true'  && localStorage.getItem('isLoggedOut') ){
      this.isLoggedIn=true;
      this.isLoggedOut=false;
  }
  else{
    this.isLoggedIn=false;
    this.isLoggedOut=true;
  }
}



login(){
  this.router.navigate(['/login']);
}


getCourse(sub: InstructorSubject) {
  this.courseholdservice.setSelectedCourse(sub);
}

scrollLeft() {
  if (this.scrollContainer) {
    this.scrollContainer.scrollBy({
      left: -300, // Scroll left by 300px (adjust as needed)
      behavior: 'smooth'
    });
  }
}

scrollRight() {
  if (this.scrollContainer) {
    this.scrollContainer.scrollBy({
      left: 300,  // Scroll right by 300px (adjust as needed)
      behavior: 'smooth'
    });
  }
}



}
