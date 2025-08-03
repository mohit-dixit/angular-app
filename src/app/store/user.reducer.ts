import { createReducer, on } from '@ngrx/store';
import { addUser } from './user.actions';

export interface User {
  firstname: string;
  lastname: string;
}

export const initialState: User[] = [];

export const userReducer = createReducer(
  initialState,
  on(addUser, (state, { firstname, lastname }) => [...state, { firstname, lastname }])
);
