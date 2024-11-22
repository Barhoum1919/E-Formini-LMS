import { CommonModule } from '@angular/common';
import { Component, OnInit,AfterViewInit} from '@angular/core';
import { RouterLink } from '@angular/router';
declare var $: any; 
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,AfterViewInit {

  constructor() {}
  showFields: boolean[] = [false, false,false,false,false];
  isLoading: boolean = true; // Initial state for loading
  ngOnInit(): void {
    
      this.ngAfterViewInit();
  
   
    // Simulate an asynchronous operation (e.g., data fetching)
    setTimeout(() => {
      this.isLoading = false;
    }, 2000); 
 
  }
  ngAfterViewInit(): void {
   
      this.showFields.forEach((_, index) => {
        setTimeout(() => {
          this.showFields[index] = true; 
        }, index * 800); 
      });
    
   
  }
}