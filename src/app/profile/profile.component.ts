import { Component, OnInit } from '@angular/core';
import { Student } from '../models/Student';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
isLoggedIn!:boolean;
isLoading:boolean=true;
user!:any;
name!:string;
email!:string;
age!:number;
constructor(private userservice:UserService) {
}
ngOnInit(): void {
  this.isLoggedIn = true;
  setTimeout(() => {
    this.isLoading = false; 
  }, 1000);
  if (this.isLoggedIn){
    this.getUser();
  }
}
getUser(){
  this.userservice.getUser().subscribe((data:any)=>{
    this.user=data;
    console.log(this.user);
    this.name=this.user.name;
    this.age=this.user.age;
    this.email=this.user.email;
    

    })
}
}
