import { Injectable } from '@angular/core';

export interface ChatMessage {
  sender: 'user' | 'ai';
  content: string;
}

@Injectable({ providedIn: 'root' })
export class ChatbotStateService {
  private messages: ChatMessage[] = [];

  getMessages(): ChatMessage[] {
    return this.messages;
  }
  addMessage(msg: ChatMessage): void {
    this.messages.push(msg);
    // You can add persistence with localStorage if desired
  }
}
