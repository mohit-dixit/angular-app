import { createAction, props } from '@ngrx/store';

export const addUser = createAction(
  '[User Form] Add User',
  props<{ firstname: string; lastname: string }>()
);
