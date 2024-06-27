import { Injectable } from '@angular/core';
import { AlertifyOptions } from './models/AlertifyOptions';
declare var alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  message(message:string,options:Partial<AlertifyOptions>){
    alertify.set('notifier','delay', options.delay)
    alertify.set('notifier','position', options.position)
    const msj = alertify[options.messageType](message);
    if(options.dismissOthers){
      msj.dismissOthers();
    }
}

dismissAll(){
  alertify.dismissAll();
}
}
