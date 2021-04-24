import { Component, OnInit } from '@angular/core';
import { IonDatetime } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ContextService } from 'src/app/core/services/context.service';
import { DataService } from 'src/app/core/services/data.service';
import {
  addMinutes,
  Game,
  randomNumber,
  Score,
  Words,
} from 'src/app/shared/models/game.model';

@Component({
  selector: 'rnds-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.scss'],
})
export class GameScreenComponent implements OnInit {
  subs: Subscription[] = [];
  isStarted = false;
  myTurn: boolean;
  currentPlayer: number;
  currentWord: Words;
  scores: Score[];
  currentDeadline: Date;

  public get currentPlayerName(): string {
    return this.contextService.players.find(
      (p) => p.uuid === this.currentPlayer
    )?.name;
  }
  private timeRemaining: string;
  public get secondsRemaining() {
    setTimeout(() => {
      if (this.currentDeadline) {
        const value =
          (this.currentDeadline.getTime() - new Date().getTime()) / 1000;
        this.timeRemaining =
          value > 0
            ? new Date(Math.round(value) * 1000).toISOString().substr(14, 5)
            : '00:00';
      } else {
        this.timeRemaining = '00:00';
      }
    });
    return this.timeRemaining;
  }

  constructor(
    private dataService: DataService,
    private contextService: ContextService
  ) {
    this.subs.push(
      dataService
        .listenerOnCurrentGame(this.contextService.roomId)
        .subscribe((game: Game) => {
          this.currentPlayer = game.currenPlayer;
          contextService.unplayedWords = game.unplayed;
          contextService.playedWords = game.played;
          this.scores = game.scores;
          this.currentDeadline = game['currentDeadline'].toDate();
          if (!contextService.players) {
            contextService.players = game.personDetails;
          }
          if (game.isStarted) {
            this.isStarted = true;
            if (game.currenPlayer === contextService.myUuid) {
              // My turn
              this.myTurn = true;
            } else {
              // Others turn
              this.myTurn = false;
            }
          } else if (
            game.words.length ===
              game.personDetails.length * game.wordsPerPerson &&
            !game.currenPlayer &&
            game.personDetails[0].uuid === contextService.myUuid
          ) {
            // I am starting the round
            game.isStarted = true;
            game.played = [];
            game.unplayed = game.words;
            game.currenPlayer = contextService.myUuid;
            this.currentPlayer = contextService.myUuid;
            this.isStarted = true;
            // My turn
            this.myTurn = true;
            this.saveGame(game, contextService.roomId);
          }
        })
    );
  }
  saveGame(game: Game, id: string) {
    this.dataService.updateGame(game, id).then(() => {});
  }
  //#region My Turn
  showWord() {
    this.dataService.getGame(this.contextService.roomId).subscribe((doc) => {
      if (doc.exists) {
        const game = doc.data();
        if (this.contextService.unplayedWords.length === 0) {
          game.unplayed = game.played;
          game.played = [];
          this.contextService.unplayedWords = game.unplayed;
          this.contextService.playedWords = [];
        }
        this.setCurrentWord(game);
        this.saveGame(game, this.contextService.roomId);
      }
    });
  }
  setCurrentWord(game: Game) {
    const index = randomNumber(0, this.contextService.unplayedWords.length - 1);
    this.currentWord = this.contextService.unplayedWords[index];
    // Start Timer
    game.currentDeadline = addMinutes(new Date(), 2);
    this.currentDeadline = game.currentDeadline;
  }
  correct() {
    // update played words
    // update unplayed words
    // update score
    // update current player to next player
  }

  wrong() {
    // dont update played words
    // dont update unplayed words
    // update score
    // update current player to next player
  }
  //#endregion
  ngOnInit(): void {}
}
