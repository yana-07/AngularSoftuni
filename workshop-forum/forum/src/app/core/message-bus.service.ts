import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface Message { text: string, type: MessageType}

export enum MessageType {
  Success,
  Error
}

@Injectable({
  providedIn: 'root'
})
export class MessageBusService {

  private _messageQueue = new Subject<Message>();

  onNewMessage$: Observable<Message> = this._messageQueue.asObservable();

  constructor() { }

  notifyAboutMessage(message: Message): void {
    this._messageQueue.next(message);
  }

  clear(): void {
    this._messageQueue.next(undefined as any);
  }
}
