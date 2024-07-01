import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private hubConnection: HubConnection;
  private messageReceivedCallback: (user: string, message: string) => void;
  constructor() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7144/chathub', { withCredentials: true })
      .build();

    this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
      if (this.messageReceivedCallback) {
        this.messageReceivedCallback(user, message);
      }
    });

    this.hubConnection.start().catch(err => console.error('Error while starting connection: ', err));
  }
  public sendMessage(user: string, message: string): void {
    this.hubConnection.invoke('SendMessage', user, message).catch(err => console.error(err));
  }

  public onMessageReceived(callback: (user: string, message: string) => void): void {
    this.messageReceivedCallback = callback;
  }
}
