import { Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { ContactComponent } from './contact/contact/contact.component';
import { AboutComponent } from './about/about/about.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { CourseRegistrationComponent } from './course-registration/course-registration.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'contact', component: ContactComponent},
    { path: 'about', component: AboutComponent},
    { path: 'courses', component: CoursesComponent},  
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'dashboard', component:DashboardComponent },
    { path: 'profile', component:ProfileComponent },
    { path: 'course-register', component:CourseRegistrationComponent },
    { path: 'chat-bot', component:ChatbotComponent },
];
