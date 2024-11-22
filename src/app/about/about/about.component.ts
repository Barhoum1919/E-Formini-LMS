import { CommonModule } from '@angular/common';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import { InstructorService } from '../../services/instructor.service';
import { Instructor } from '../../models/Instructor';
import { Subject } from '../../models/Subject';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit,AfterViewInit{
  isLoading: boolean = true; 
  showFields: boolean[] = [false, false,false, false,false, false];
  instructor!:Instructor;
  instructors!:Instructor[];
  showInstructors!:Instructor[];
  InstructorSubject!:Instructor;
  subject!:Subject;
  constructor(private instructorservice:InstructorService){}
  ngOnInit(): void {
    
    setTimeout(() => {
      this.isLoading = false; 
    }, 2000); 
    this.getInstructors();
    
  }
  ngAfterViewInit(): void {
    this.showFields.forEach((_, index) => {
      setTimeout(() => {
        this.showFields[index] = true; 
      }, index * 900); 
    });
  }
  getInstructors(){
    this.instructorservice.getInstructors().subscribe(
      (data:any) => {
        this.instructors = data.resultat.items.map((instructor: any) => ({
          ...instructor,
          urlImage: `https://localhost:7288/${instructor.urlImage}`
        }));
        this.showInstructors = this.instructors.slice(0, 4);
        this.instructors.forEach(instructor => {
          this.getInstructorSubject(instructor);
        });
      }
    )
  }

  getInstructorSubject(instructor:Instructor){
    this.instructorservice.getSubjectInstructor(instructor.subjectId).subscribe(
      (data:any) => {
        this.subject = data.resultat;
        console.log(instructor.name,this.subject);
        }
        );
  }

}
