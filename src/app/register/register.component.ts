import { CommonModule } from '@angular/common';
import { Component, OnInit,AfterViewInit } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink,Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, AfterViewInit {
  registerForm: FormGroup;
  isLoading = true;
  showFields: boolean[] = [false, false, false, false, false]; // Track visibility of each field

  constructor(private fb: FormBuilder,private userservice:UserService,private router: Router) {
    this.registerForm = this.fb.group({
      id:[''],
      Name: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      ClassLevel: ['', Validators.required],
      Age: ['', Validators.required],
      Password:  [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$<>#!%*?&_-])[A-Za-z\d@$<>#!%*?&_-]{6,}$/)
        ]],
    });
    
  }

  ngOnInit(): void {
    // Initialize fields to show with a delay
    setTimeout(() => {
      this.isLoading = false; 
    }, 1000);
    /*this.userservice.getUsers().subscribe(
      (data: any) => {
        console.log(data.resultat.items);
      }
    )*/
  }

 
  ngAfterViewInit(): void {
    this.showFields.forEach((_, index) => {
      setTimeout(() => {
        this.showFields[index] = true; 
      }, index * 700); 
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.userservice.UserRegistration(this.registerForm.value).subscribe(
        {
          next: () => {
            this.isLoading = false; 
            Swal.fire({
              title: "Successfully Registered!",
              text: "You've submitted the form! Please Login Now",
              icon: "success",
              confirmButtonText: "OK"
            });
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.isLoading = false; 
            Swal.fire({
              title: "Registered Failed !",
              text: "Email or User Name Taken ! ",
              icon: "error",
              confirmButtonText: "Try Again !",
              confirmButtonColor:"#0d6efd",
            });
            console.error(err); 
          }
        }
      );
    
        

      //this.isLoading = true;
      //setTimeout(() => {
        //this.isLoading = false;
       // }, 1000);
      //alert("You Have been registred successfully")
      //this.registerForm.reset();

      
    }
  }
}
