import { createFeatureSelector } from '@ngrx/store';
import { User } from './user.reducer';

export const selectUsers = createFeatureSelector<User[]>('users');
