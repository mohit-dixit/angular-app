import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private totalSeconds = 120; // Default countdown - 2 minutes
  private timerSubscription!: Subscription;
  private timeSubject = new BehaviorSubject<number>(0);
  time$ = this.timeSubject.asObservable();

  private timerRunning = false;
  private STORAGE_KEY = 'countdown-end-time';

  constructor() {
    this.resumeTimerIfExists(); // Check on init
  }

  startTimer() {
    if (this.timerRunning) return;

    const existingEndTime = localStorage.getItem(this.STORAGE_KEY);
    if (existingEndTime) {
      // Timer already exists — resume it instead of restarting
      this.resumeTimerIfExists();
      return;
    }

    const endTime = Date.now() + this.totalSeconds * 1000;
    localStorage.setItem(this.STORAGE_KEY, endTime.toString());
    this.runCountdown(endTime);
  }

  private resumeTimerIfExists() {
    if (this.timerRunning) return;

    const storedEndTime = localStorage.getItem(this.STORAGE_KEY);
    if (storedEndTime) {
      const endTime = parseInt(storedEndTime, 10);
      const remaining = Math.floor((endTime - Date.now()) / 1000);
      if (remaining > 0) {
        this.runCountdown(endTime);
      } else {
        this.clearStorage();
        this.timeSubject.next(0);
      }
    }
  }

  private runCountdown(endTime: number) {
    if (this.timerRunning) return;
    this.timerRunning = true;

    this.timerSubscription = interval(1000).subscribe(() => {
      const remaining = Math.floor((endTime - Date.now()) / 1000);
      this.timeSubject.next(Math.max(remaining, 0));

      if (remaining <= 0) {
        this.stopTimer();
        this.clearStorage();
      }
    });
  }

  stopTimer() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.timerRunning = false;
  }

  resetTimer() {
    this.stopTimer();
    this.clearStorage();
    this.timeSubject.next(this.totalSeconds);
  }

  private clearStorage() {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
