import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  interval: any;
  roundNumber: number;

  public get currentPlayerName(): string {
    return this.contextService.players.find(
      (p) => p.uuid === this.currentPlayer
    )?.name;
  }
  private timeRemaining: string;
  public get secondsRemaining() {
    return this.timeRemaining ?? '00:00';
  }

  constructor(
    private dataService: DataService,
    private contextService: ContextService,
    private router: Router
  ) {
    this.subs.push(
      dataService
        .listenerOnCurrentGame(this.contextService.roomId)
        .subscribe((game: Game) => {
          this.currentPlayer = game.currenPlayer;
          this.currentWord = game.currentWord;
          this.roundNumber = game.roundNumber;
          contextService.unplayedWords = game.unplayed;
          contextService.playedWords = game.played;
          contextService.myTeam = game.personDetails.find(
            (pd) => pd.uuid === this.contextService.myUuid
          ).team;
          this.scores = game.scores;
          if (game['currentDeadline']) {
            this.currentDeadline = new Date(game.currentDeadline.toDate());
          } else {
            this.currentDeadline = game.currentDeadline;
          }
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
              if (this.interval) {
                clearInterval(this.interval);
              }
            }
          } else if (
            game.words.length >=
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

        this.setCurrentWord(game, true);
      }
    });
  }
  setCurrentWord(game: Game, resetTimer: boolean) {
    if (this.contextService.unplayedWords.length === 0) {
      game.unplayed = game.played;
      game.played = [];
      this.contextService.unplayedWords = game.unplayed;
      this.contextService.playedWords = [];
      // pause timer
      game.roundNumber += 1;
      if (game.roundNumber > 3) {
        this.router.navigate(['/game/end-game']);
      }
    }
    const index = randomNumber(0, this.contextService.unplayedWords.length - 1);
    this.currentWord = this.contextService.unplayedWords[index];
    game.currentWord = this.currentWord;
    // Start Timer
    if (resetTimer) {
      game.currentDeadline = addMinutes(new Date(), 0.1);
      this.interval = setInterval(() => {
        const value =
          (this.currentDeadline.getTime() - new Date().getTime()) / 1000;
        if (value > 0) {
          this.timeRemaining = new Date(Math.round(value) * 1000)
            .toISOString()
            .substr(14, 5);
        } else {
          this.timeRemaining = '00:00';
          clearInterval(this.interval);
        }
      }, 1000);
    }
    this.currentDeadline = game.currentDeadline;
    this.saveGame(game, this.contextService.roomId);
  }
  correct() {
    this.dataService.getGame(this.contextService.roomId).subscribe((doc) => {
      if (doc.exists) {
        const game = doc.data();
        // update played words
        game.played.push(this.currentWord);
        // update unplayed words
        game.unplayed.splice(
          game.unplayed.findIndex((up) => up.value === this.currentWord.value),
          1
        );
        const currentScore = game.scores.find(
          (sc) => sc.team === this.contextService.myTeam
        );
        // update score
        currentScore.value += 1;
        // also update log;

        // update current player to next player if time is up
        if (this.secondsRemaining == '00:00') {
          this.setNextPlayer(game);
        } else {
          this.setCurrentWord(game, false);
        }
      }
    });
  }

  wrong() {
    // dont update played words
    // dont update unplayed words
    // dont update score
    // update current player to next player
    this.dataService.getGame(this.contextService.roomId).subscribe((doc) => {
      if (doc.exists) {
        const game = doc.data();
        this.setNextPlayer(game);
      }
    });
  }
  //#endregion
  ngOnInit(): void {}

  setNextPlayer(game: Game) {
    this.dataService
      .deleteCurrentDeadline(this.contextService.roomId)
      .then(() => {
        delete game.currentDeadline;
        game.currenPlayer = game.personDetails.find(
          (ppd, i) =>
            ppd.team !== this.contextService.myTeam &&
            i >
              game.personDetails.findIndex(
                (pd) => pd.uuid === this.contextService.myUuid
              )
        ).uuid;
        this.saveGame(game, this.contextService.roomId);
      });
  }
}
