import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent {
  user: string = '';
  message: string = '';
  messages: { user: string, message: string }[] = [];

  constructor(private chatService: ChatService) {}
  ngOnInit(): void {
    this.chatService.onMessageReceived((user, message) => {
      this.messages.push({ user, message });
    });
  }
  sendMessage(): void {
    if (this.user && this.message) {
      this.chatService.sendMessage(this.user, this.message);
      this.message = '';
    }
  }
}
