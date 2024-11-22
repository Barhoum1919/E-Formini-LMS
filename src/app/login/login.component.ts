import { CommonModule } from '@angular/common';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  RouterLink , Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true; // Initial state for loading
  showFields: boolean[] = [false, false]; // Track visibility of each field
  loginForm!:FormGroup;
  button:string='Join Now';

  constructor(private fb: FormBuilder, private loginservice:LoginService , private router: Router){
    this.loginForm = this.fb.group({
      UserName: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6)]]
      });

  }

  ngOnInit(): void {
    // Simulate an asynchronous operation (e.g., data fetching)
    setTimeout(() => {
      this.isLoading = false; // Hide spinner after 2 seconds (or your data load time)
    }, 2000); // Adjust time as needed
  }

  ngAfterViewInit(): void {
    this.showFields.forEach((_, index) => {
      setTimeout(() => {
        this.showFields[index] = true; // Show field one by one
      }, index * 1000); // Adjust delay as needed
    });
  }
  onSubmit(){
      if (this.loginForm.valid){
        this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        }, 2000);
        
      
        this.loginservice.login(this.loginForm.value).subscribe(
          {
            next: (response) => {
             //this.isLoading = false;
             //console.log(response);
              if (response && response.token) {// Check for token or other properties in response
                localStorage.setItem('button', 'Logout');
                this.button='Logout';
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('isLoggedOut','false');
                Swal.fire({
                  title: " Successful Login !",
                  icon: "success",
                  confirmButtonText: "OK",
                  confirmButtonColor:"#0d6efd",
                });
                this.router.navigate(['/dashboard']);
                
              }
              else{
                Swal.fire({
                  title: "Invalid Email Or Password !",
                  icon: "error",
                  confirmButtonText: "Try Again",
                  confirmButtonColor:"#0d6efd",
                  });
              }
            },
            error: (err) => {
              this.isLoading = false;
              Swal.fire({
                title: " Invalid Email Or Password !",
                icon: "error",
                confirmButtonText: "Try Again",
                confirmButtonColor:"#0d6efd",
              });
              console.error("Login error:", err);
              alert("Invalid Email or Password! Try Again ");
            }
          }
        )
      //console.log(this.loginForm.value);
      //console.log("Login with success");
      }
      

  }
}
