import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dialog-restart',
  templateUrl: './dialog-restart.component.html',
  styleUrls: ['./dialog-restart.component.scss']
})
export class DialogRestartComponent {

  constructor(public dialogRef: MatDialogRef<DialogRestartComponent>, private router: Router) {}
  

  /**
   * Closes the dialog without taking any specific action.
   */
  onNoClick() {
    this.dialogRef.close();
  }


  /**
   * Restarts the game and navigates to the root URL.
   */
  restartGame() {
    this.router.navigateByUrl('/');
    this.dialogRef.close();
  }
}
