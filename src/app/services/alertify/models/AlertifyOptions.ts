import { MessageType } from "../enums/MessageType";
import { Position } from "../enums/Position";

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position : Position = Position.BottomLeft;
  delay:number = 3;
  dismissOthers:boolean = false;
}
