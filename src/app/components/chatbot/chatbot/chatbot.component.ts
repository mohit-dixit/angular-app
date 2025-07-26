import { Component } from '@angular/core';
import { NgFor, NgClass, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotStateService } from '../../../services/chatmessage/chatbotstate.service';
import { HttpService } from '../../../services/http/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [NgFor, NgClass, FormsModule, CommonModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  messages: any;
  userInput = '';
  showChatBox = false;

  constructor(private state: ChatbotStateService,
    private _httpservice: HttpService) {
    this.messages = this.state.getMessages();
  }

  sendMessage(): void {
    const trimmed = this.userInput.trim();
    if (!trimmed) return;
    this.state.addMessage({ sender: 'user', content: trimmed });
    let api = environment.apis.chat;

    // Send user's message to backend AI
    this._httpservice.getChatResponse(api, trimmed).subscribe({
      next: (res : any) => {
        this.state.addMessage({ sender: 'ai', content: res.response });
      },
      error: () => {
        this.state.addMessage({ sender: 'ai', content: 'Sorry, something went wrong.' });
      }
    });

    this.userInput = '';
  }
}
