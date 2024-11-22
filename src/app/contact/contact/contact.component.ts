import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit,AfterViewInit {
  isLoading: boolean = true; 
  showFields: boolean[] = [false, false,false, false,false, false,false, false,false, false,false, false,false, false,false,false];
  ngOnInit(): void {
    
    setTimeout(() => {
      this.isLoading = false; 
    }, 1000); 
  }
  ngAfterViewInit(): void {
    this.showFields.forEach((_, index) => {
      setTimeout(() => {
        this.showFields[index] = true; 
      }, index * 400); 
    });
  }
}
