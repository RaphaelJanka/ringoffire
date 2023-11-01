import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnChanges {

  cardAction = [
    { title: 'Waterfall', description: 'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.' },
    { title: 'You', description: 'You decide who drinks.' },
    { title: 'Me', description: 'Congrats! Drink a shot!' },
    { title: 'Chicks', description: 'All girls drink.' },
    { title: 'Thumb Master', description: 'When the time is right put your thumb on the table. Now the other players have to do the same. The last one has to drink. Be careful! If you wait too long and someone picks another 5, you lose your right!' },
    { title: 'Men', description: 'All men drink.' },
    { title: 'Heaven', description: 'Put your hands up! The last player drinks!' },
    { title: 'Mate', description: 'Pick a mate. Your mate must always drink when you drink and the other way around.' },
    { title: 'Rhyme', description: 'Pick a word. The person next to you must rhyme with it and it goes to the next person, until someone messes up. This player will have to drink. (None rhymable words are not permitted!) ' },
    { title: 'Category', description: 'Come up with a category such as sports. Each player must say a word that fits with the category. Whoever messes up, drinks.' },
    { title: 'Rule', description: 'Make a rule. Everyone (including you) has to follow this rule until the end of the game. Whoever breaks the rule, drinks.' },
    { title: 'Question Master', description: 'The player who drew the card is the first question master, players go around asking questions to each other. The question does not matter as long as it’s a question. The first person to mess up or hesitate must drink.' },
    { title: 'Pour', description: 'Every player pours a little of their drink into the cup in the center of the table. The player who pulls the final king must drink all the "Ring of Fire" cup’s contents.' },
    
  ];

  title = '';
  description = '';
  @Input() card!: string;
  constructor() { }


/**
 * Responds to changes in the 'card' input property by updating title and description properties.
 *
 * This method is triggered when the 'card' input property changes. It parses the card string to
 * determine the card number, and then updates the 'title' and 'description' properties based on
 * the card number's corresponding action details.
 */
  ngOnChanges() {
    if (this.card) {
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber -1].title;
      this.description = this.cardAction[cardNumber -1].description;
    }
  }
}
