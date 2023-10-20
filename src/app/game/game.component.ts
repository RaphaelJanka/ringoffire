import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, addDoc, collection, doc, onSnapshot, } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game!: Game;
  currentCard:any = '';
  firestore: Firestore = inject(Firestore);
  unsubGames;

  
  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.unsubGames = onSnapshot(this.getGamesRef(), (list) => {
      list.forEach(element => {
        console.log("Game:", element.data());
      });
    });

   }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
    })
  }

  ngOnDestroy() {
    this.unsubGames();
  }

  getGamesRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colID: string, docID: string) {
    return doc(collection(this.firestore, colID), docID);
  }

  async addNewGame(item:object) {
    await addDoc(this.getGamesRef(), item)
    .catch((err) => {
      console.error(err);
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef?.id);
    });
  }
  
  pickCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop(); //last value from array
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1100);
    }
  }

  newGame() {
    this.game = new Game();
    // this.addNewGame(this.game.getJSON());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}


