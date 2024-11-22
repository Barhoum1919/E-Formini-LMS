import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Student } from '../models/Student';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { Subject } from '../models/Subject';
import { CourseRegistrationService } from '../services/course-registration.service';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit,AfterViewInit {
student!:Student;
showFields: boolean[] = [false, false,false, false,false, false,false, false,false];
isLoggedIn:boolean=true;
isLoading:boolean=true;
user!:any;
name!:string;
savedCourseList: any[] = [];  // To store the list of courses
courseList: any[] = [];



constructor(private router:Router, private userservice:UserService , private registercourse:CourseRegistrationService) {}
ngOnInit(): void {
  this.checkLogin();
  
  setTimeout(() => {
    this.isLoading = false; 
  }, 8000); 
  this.userservice.getUser().subscribe((data:any)=>{
    this.user=data;
    console.log(this.user);
    this.putName();
    })
    var savedCourseList = localStorage.getItem('CourseList');
    if (savedCourseList) {
      // If it exists, parse it and assign it to courseList
      this.courseList = JSON.parse(savedCourseList);
    }
   

    this.getCourses();
}

ngAfterViewInit(): void {
  this.showFields.forEach((_, index) => {
    setTimeout(() => {
      this.showFields[index] = true; 
    }, index * 950); 
  });
}
Logout(){
  this.isLoggedIn=false;
  localStorage.setItem('isLoggedOut','true');
  this.router.navigate(['/login']);
}


checkLogin(){
  if(localStorage.getItem('isLoggedIn')=='false' || localStorage.getItem('isLoggedOut')=='true' ){
    Swal.fire({
      title: 'Error',
      text: 'You are not logged in',
      icon: 'error',
      confirmButtonText: "Login Now",
      confirmButtonColor:"#0d6efd",
    })
    this.router.navigate(['/login']);
      
  }
}
getUser(){
  this.userservice.getUser().subscribe((data:any)=>{
    this.user=data;
    console.log(this.user);
    })
}
putName(){
  this.name = this.user.name;
}
getCourses(){
  var id=localStorage.getItem('UserId');
  //console.log(id);
  if (!id) {
    console.error('UserId is not found in localStorage.');
    return;
  }
  this.registercourse.getCourses(id).subscribe((data:any)=>{
    this.courseList=data.resultat.map((subject: any) => ({
      ...subject,
      urlImage: `https://localhost:7288/${subject.urlImage}`
    }));;
    console.log(this.courseList);
    
  });

}
}
