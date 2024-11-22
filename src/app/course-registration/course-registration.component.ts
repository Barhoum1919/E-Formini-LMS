import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectService } from '../services/subject.service';


import { CourseRegistrationService } from '../services/course-registration.service';
import { Subject } from '../models/Subject';
import { CommonModule } from '@angular/common';
import { Student } from '../models/Student';
import { UserService } from '../services/user.service';
import { CourseRegistration } from '../models/CourseRegistration';
import { CourseholdService } from '../shared/coursehold.service';
import { InstructorSubject } from '../models/InstructorSubject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-registration',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.scss']
})
export class CourseRegistrationComponent implements OnInit {
  registrationForm!: FormGroup;
  subjects: Subject[] = [];  // List of courses
  selectedCourse!: InstructorSubject ; // Track selected course
  currentuser!:any;
  isLoading: boolean = true;
  showFields: boolean[] = [false, false, false, false, false, false, false, false,false];
  courseList:InstructorSubject[]=[];


  constructor(
    private userservice:UserService,
    private fb: FormBuilder,
    private subjectservice: SubjectService,
    private courseservicehold:CourseholdService,
    private router:Router,
    private courseregisterservice : CourseRegistrationService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 4000);
    this.courseservicehold.selectedCourse$.subscribe((course) => {
      this.selectedCourse = course;
    });
    this.initializeForm();
  }

  
 

  // Initialize the registration form
  initializeForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      course: ['', Validators.required]
    });
  }

  // Load the list of subjects/courses available
  loadSubjects() {
    this.subjectservice.getSubjects().subscribe((data: any) => {
      this.subjects = data.resultat.items;  // Assuming the API returns courses in `resultat.items`
    });
  }

  // Handle course selection (from the list of available courses)
  /*onCourseSelect(course: Subject) {
    this.selectedCourse = course;
    this.registrationForm.patchValue({ course: course.id }); // Set the selected course ID in the form
  }*/

  // Handle form submission
  onSubmit() {
    // Check if selectedCourse is not empty before adding
   /* if (this.selectedCourse && Object.keys(this.selectedCourse).length > 0) {
      // Add the selected course to the courseList
      this.courseList.push(this.selectedCourse);

      // Store the updated course list in localStorage as a JSON string
      localStorage.setItem('CourseList', JSON.stringify(this.courseList));

      // Navigate to the dashboard
      this.router.navigate(['/dashboard']);
    }
  }*/

     this.userservice.getUser().subscribe(
      (data: any) => {
        this.currentuser = data;
        var date=new Date();
        console.log(this.selectedCourse.subjectId);
        console.log(this.currentuser.id);
        //console.log(this.currentuser);
        const courseRegistration :CourseRegistration= {
          UserId: this.currentuser.id,
          SubjectId: this.selectedCourse.subjectId,
          EnrollementDate: date.toISOString()
        };
        this.courseregisterservice.addCourse(courseRegistration).subscribe(
          (response: any) => {
            //console.log(response);
            this.router.navigate(['/dashboard']);
            }
     )
     
    
    } );





}

}
