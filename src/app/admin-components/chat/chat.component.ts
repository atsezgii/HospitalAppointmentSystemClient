import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from './models/message';
import { AuthService } from '../../features/auth/services/auth.service';
@Component({
  selector: "app-chat",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.scss"
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = "";

  currentUser = {
    id: "",
    name: "",
    avatar: "../assets/images/doctors/genderneutral.jpg"
  };

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.onMessageReceive();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser.id = this.authService.getCurrentUserId();
    this.currentUser.name = this.authService.getCurrentUserName();
    console.log("Current User ID:", this.currentUser.id);
    console.log("Current User Name:", this.currentUser.name);
  }
  onMessageReceive() {
    this.chatService.onMessageReceived((user: string, message: string) => {
      this.messages.push({
        user: user,
        avatar:
          user === this.currentUser.name
            ? this.currentUser.avatar
            : "../assets/images/doctors/genderneutral.jpg",
        text: message,
        time: new Date().toLocaleTimeString()
      });
    });
  }
  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.chatService.sendMessage(this.currentUser.name, this.newMessage);
      this.newMessage = "";
    }
  }
}
