import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent {
  name: any = '';
  constructor(public dialogRef: MatDialogRef<DialogAddPlayerComponent>) {}


  /**
   * Closes the dialog without taking any specific action.
   */
  onNoClick() {
    this.dialogRef.close();
  }
}
