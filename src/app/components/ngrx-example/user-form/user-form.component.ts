import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addUser } from '../../../store/user.actions';
import { selectUsers } from '../../../store/user.selectors';
import { User } from '../../../store/user.reducer';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  userForm!: FormGroup;
  users$!: Observable<User[]>;

  constructor(private fb: FormBuilder, private store: Store) {
    this.userForm = this.fb.group({
      firstname: [''],
      lastname: ['']
    });

    this.users$ = this.store.select(selectUsers);
  }

  submit() {
    const { firstname, lastname } = this.userForm.value;
    if (firstname && lastname) {
      this.store.dispatch(addUser({ firstname, lastname }));
      this.userForm.reset();
    }
  }
}
