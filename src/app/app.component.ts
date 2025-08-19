import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';
import { SpinnerCustomizationComponent } from './components/spinner/spinner-customization/spinner-customization.component';
import { LoadingService } from './services/loader/loading.service';
import { delay } from 'rxjs';
import { ChatbotComponent } from './components/chatbot/chatbot/chatbot.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    SidepanelComponent,
    SpinnerCustomizationComponent,
    ChatbotComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // CORRECTED HERE
  preserveWhitespaces: true,
})
export class AppComponent {
  title = 'my-app';
  loading = false;

  constructor(private _loading: LoadingService, private _router: Router) {
    this._router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-RDMVWEPPW6', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  ngOnInit(): void {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
