import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, doc, docData, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
 
  firestore: Firestore = inject(Firestore);
  unsubGames;
  gameId: string = '';
  
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
      this.gameId = params['id'];
      let game$ = docData(this.getSingleDocRef('games', this.gameId));
      game$.subscribe((game: any) => {
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.players;
        this.game.stack = game.stack;
        this.game.currentCard = game.currentCard;
        this.game.pickCardAnimation = game.pickCardAnimation;
      })
    });
  
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

  
  
  pickCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop(); //last value from arrayS
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.updateGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.updateGame();
      }, 1100);
    }
  }

  newGame() {
    this.game = new Game();
   
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.updateGame();
      }
    });
  }

  async updateGame() {
    let docRef = this.getSingleDocRef('games', this.gameId);
    await updateDoc(docRef, this.game.getJSON())
    .catch((err)=> {console.error(err)});
  }
  
}


