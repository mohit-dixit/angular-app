import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepartmentComponent } from './components/department/department.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DepartmentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-app';

  constructor(){}
}
