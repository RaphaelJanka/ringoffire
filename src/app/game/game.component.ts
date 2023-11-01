import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collection, doc, docData, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { DialogRestartComponent } from '../dialog-restart/dialog-restart.component';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss', 'game.component.media-query.scss']
})
export class GameComponent implements OnInit {
  game!: Game;
 
  firestore: Firestore = inject(Firestore);
  unsubGames;
  gameId: string = '';
  

/**
  * Creates an instance of the class with dependencies and initializes a listener for game snapshots.
  *
  * @param {MatDialog} dialog - An instance of the MatDialog service for displaying dialogs.
  * @param {ActivatedRoute} route - An instance of the ActivatedRoute service for route handling.
  */
  constructor(public dialog: MatDialog, private route: ActivatedRoute) {
    this.unsubGames = onSnapshot(this.getGamesRef(), (list) => {
      list.forEach(element => {
        console.log("Game:", element.data());
      });
    });
   }
  

  /**
   * This function initializes a new game
   */
  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
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


  /**
   * This function unsubscribes a game
   */
  ngOnDestroy() {
    this.unsubGames();
  }


  /**
   * This function collects the game reference
   * @returns 
   */
  getGamesRef() {
    return collection(this.firestore, 'games');
  }


  /**
   * This function collects the document reference
   * @param colID 
   * @param docID 
   * @returns 
   */
  getSingleDocRef(colID: string, docID: string) {
    return doc(collection(this.firestore, colID), docID);
  }

  
  /**
   * Draws a game card from the stack and updates the game state.
   */
  pickCard() {
    if (this.game.players.length > 1) {
      if (!this.game.pickCardAnimation && this.game.stack.length > 0) {
        this.game.currentCard = this.game.stack.pop();
        this.game.pickCardAnimation = true;
        this.switchCurrentPlayer();
        this.updateGame();
        this.addPlayedCards();
        this.showRestartMessage(); 
      }
    }
  }


  /**
   * Adds the current card to the played cards list after a delay.
   */
  addPlayedCards() {
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.updateGame();
      
    }, 1100);
  }


  /**
   * Switches to the next player's turn in the game.
   */
  switchCurrentPlayer() {
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
  }


  /**
   * Starts a new game by creating a new game instance.
   */
  newGame() {
    this.game = new Game();
  }


  /**
   * Opens a dialog for adding a new player to the game.
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);
    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.updateGame();
      }
    });
  }


  /**
   * Updates the game state in a Firestore document.
   */
  async updateGame() {
    let docRef = this.getSingleDocRef('games', this.gameId);
    await updateDoc(docRef, this.game.getJSON())
    .catch((err)=> {console.error(err)});
  }


  /**
   * Displays a restart message dialog when the game's stack is empty.
   */
  showRestartMessage() {
    if (this.game.stack.length === 0) {
      this.dialog.open(DialogRestartComponent);
    }
  }
  
}


