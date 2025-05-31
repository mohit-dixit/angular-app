import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';
import { FooterComponent } from './components/footer/footer.component';

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
