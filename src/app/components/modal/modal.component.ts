import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalTypes } from '../../constants/globalconst';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  imports: [MatDialogModule, MatButtonModule, CommonModule, MatIcon],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})

export class ModalComponent {
  message: string;
  modaltitle: string;
  toShowExtendButton: boolean = true;
  modaltype: string = 'session';
  modalTypes: any = ModalTypes;

  constructor(private _router: Router,
    public _dialog: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.message;
    this.modaltitle = data.modaltitle;
    this.modaltype = data.modaltype;
    if (data.toShowExtendButton === false) {
      this.toShowExtendButton = data.toShowExtendButton;
    }
  }

  closePopup(value : boolean) {
    this._dialog.close(value);
  }
}
