import { Injectable } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { HubConnectionState } from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';


@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  private _connection : HubConnection;
  get connection() : HubConnection{
    return this._connection;
  }

  start(hubUrl:string){
    console.log(hubUrl)
    //connection yoksa
    if(!this.connection || this._connection?.state == HubConnectionState.Disconnected){
      const builder: HubConnectionBuilder = new HubConnectionBuilder();
      const hubConnection : HubConnection = builder.withUrl(hubUrl)
        .withAutomaticReconnect()
        .build();
        hubConnection.start()
          .then(()=>{console.log("Connected");})
          .catch(error=> setTimeout(()=> this.start(hubUrl),2000));//eğer bağlanmazsa 2 sn ye de bir bağlanmayı dene
          this._connection = hubConnection;

    }
    //connection varsa
    this._connection.onreconnected(connectionId => console.log("Reconnected"));
    this._connection.onreconnecting(error => console.log("Reconnecting"));
    this._connection.onclose(error => console.log("Close reconnection"));
  }
  //.net = LiveChatHubService/GetMessageAsync
  invoke(procedureName:string, message:any, successCallBack?: (value)=> void, errorCallBack?: (error) => void){
    this.connection.invoke(procedureName,message)
      .then(successCallBack)//başarılıysa
      .catch(errorCallBack);//hatalıysa
  }
  on(procedureName:string, callBack:(...message : any) => void){
    this.connection.on(procedureName,callBack);
  }
}
