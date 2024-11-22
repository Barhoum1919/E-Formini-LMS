import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Student } from '../../models/Student';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isSticky: boolean = false;
  button: string = 'Join Now';
  isLoggedIn!:boolean;
  isLoggedOut!:boolean;
  user!:any;
  name!:string;

  constructor(private router: Router, private userservice:UserService) {}

  ngOnInit(): void {
    // Listen to route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateButton();
        this.userservice.getUser().subscribe((data:any)=>{
          this.user=data;
          this.putName();
          })
      }
    });


    // Initial check on component load
    this.updateButton();
    
    
    
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.scrollY;
    this.isSticky = scrollTop > 250; // Sticky navbar logic
  }

  updateButton() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    this.button = isLoggedIn ? 'Logout' : 'Join Now';
  }

  logout() {
    if (this.button === 'Logout') {
      localStorage.removeItem('isLoggedIn');
      this.button = 'Join Now';
      this.router.navigate(['/login']); // Optionally navigate to login page
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
}
