import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';
import { LoadingService } from './services/loader/loading.service';
import { delay } from 'rxjs';
import { SpinnerCustomizationComponent } from './components/spinner/spinner-customization/spinner-customization.component';
import { TimerService } from './services/timer/timer.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule,SidepanelComponent,SpinnerCustomizationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  preserveWhitespaces: true,
})
export class AppComponent {
  title = 'my-app';
  loading: boolean = false;

  constructor(private _loading: LoadingService){
  }

  ngOnInit(): void {
    this.listenToLoading();
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
}
