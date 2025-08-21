// src/app/services/ws/websocket.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppConfigService } from '../app-config.service';

export interface WsEvent<T = any> {
  type: 'CREATED' | 'UPDATED' | 'DELETED';
  payload: T;
}

@Injectable({ providedIn: 'root' })
export class WebSocketService implements OnDestroy {
  private client!: Client;
  private sub?: StompSubscription;

  private departmentsSubject = new BehaviorSubject<WsEvent | null>(null);
  departments$: Observable<WsEvent | null> = this.departmentsSubject.asObservable();

  private context: any;

  constructor(private _configService: AppConfigService
  ) {
    this.context = this._configService.getConfig().context;
  }

  connect(): void {
    if (this.client && this.client.active) return; // already connected

    // If you use HTTPS backend, this must be https://... as well
    const wsUrl = `${this.context}ws`; // e.g. http://localhost:8080/ws

    this.client = new Client({
      // Use SockJS factory
      webSocketFactory: () => new SockJS(wsUrl),
      reconnectDelay: 2000, // auto-reconnect
      onConnect: () => {
        // Subscribe to server topic
        this.sub = this.client.subscribe('/topic/departments', (msg: IMessage) => {
          try {
            const evt: WsEvent = JSON.parse(msg.body);
            this.departmentsSubject.next(evt);
          } catch {
            console.error('Bad WS payload', msg.body);
          }
        });
      },
      onStompError: frame => console.error('Broker error', frame.headers['message']),
      onWebSocketError: err => console.error('WS error', err),
    });

    this.client.activate();
  }

  disconnect(): void {
    if (this.sub) { this.sub.unsubscribe(); this.sub = undefined; }
    if (this.client?.active) this.client.deactivate();
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
