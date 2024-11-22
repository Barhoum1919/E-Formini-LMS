import { Component, inject, OnInit } from '@angular/core';
import { ChatbotService } from '../services/chatbot.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormatmsgPipe } from '../formatmsg.pipe';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [FormsModule,CommonModule,FormatmsgPipe],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent  implements OnInit{
  prompt: string = '';

  geminiService: ChatbotService = inject(ChatbotService);
  isLoading:boolean=true;
  loading: boolean = false;

  chatHistory: any[] = [];
  constructor() {
    this.geminiService.getMessageHistory().subscribe((res) => {
      if(res) {
        this.chatHistory.push(res);
      }
    })
  }
ngOnInit(): void {
  
  setTimeout(() => {
    this.isLoading = false; 
  }, 3000); 
}
  async sendData() {
    if(this.prompt && !this.loading) {
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
      await this.geminiService.generateText(data);
      this.loading = false;
    }
  }

  formatText(text: string) {
    const result = text.replaceAll('*', '<br>');
    return result;
  }
}
