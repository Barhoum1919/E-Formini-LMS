import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar/navbar.component';
import { FooterComponent } from './footer/footer/footer.component';
import { HomeComponent } from './home/home/home.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink,NavbarComponent,FooterComponent,HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Formini';
  isLoading: boolean = true; // Initial state for loading

  ngOnInit(): void {
    // Simulate an asynchronous operation (e.g., data fetching)
    setTimeout(() => {
      this.isLoading = false; // Hide spinner after 2 seconds (or your data load time)
    }, 1000); // Adjust time as needed
  }
}
