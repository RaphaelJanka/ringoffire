import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection, doc, docData, onSnapshot, } from '@angular/fire/firestore';
import { Game } from 'src/models/game';
@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss', 'start-screen.component.media-query.scss']
})
export class StartScreenComponent implements OnInit{
  firestore: Firestore = inject(Firestore);
  constructor(private router: Router) {}

  ngOnInit(): void {

  }

  /**
   * Starts a new game by creating a new Game instance and adds it to the Firestore database.
   *
   * This method initiates a new game by creating a new Game instance, converting it to a JSON object, 
   * and then calls the 'addNewGame' method to add it to the Firestore database.
   */
  newGame() {
    let game = new Game();
    this.addNewGame(game.getJSON());
  }

  /**
   * Adds a new game to the Firestore database and navigates to the game's URL.
   *
   * This asynchronous method adds a new game represented as a JSON object to the Firestore database.
   * Upon success, it navigates to the URL of the newly created game. It also handles potential errors.
   *
   * @param {object} item - The game data as a JSON object to be added to the database.
   */
  async addNewGame(item: object) {
    await addDoc(this.getGamesRef(), item)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        this.router.navigateByUrl('/game/' + docRef?.id);
      });
  }

  /**
   * Retrieves a reference to the 'games' collection in Firestore.
   *
   * This method returns a reference to the 'games' collection in the Firestore database.
   *
   * @returns {CollectionReference} A reference to the 'games' collection.
   */
  getGamesRef() {
    return collection(this.firestore, 'games');
  }

}
