import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from './models/message';
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
export class ChatComponent implements OnInit{
  messages: Message[] = [];
  newMessage: string = '';
  currentUser = {
    id: 'user1',
    name: 'Cristino Murphy',
    avatar: '../assets/images/doctors/02.jpg'
  };

  constructor(private chatService: ChatService) {}
ngOnInit(): void {
  this.onMessageReceive();
  }


  onMessageReceive(){
    this.chatService.onMessageReceived((user: string, message: string) => {
      this.messages.push({
        user: user,
        avatar: user === this.currentUser.name ? this.currentUser.avatar : '../assets/images/doctors/02.jpg',
        text: message,
        time: new Date().toLocaleTimeString()
      });
    });
  }
  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.currentUser.name, this.newMessage);
      this.newMessage = '';
    }
  }
}
