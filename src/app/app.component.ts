import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SnackbarService } from './services/snackbar/snackbar.service';
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule,SidepanelComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  preserveWhitespaces: true,
})
export class AppComponent {
  title = 'my-app';

  constructor(){}
}
