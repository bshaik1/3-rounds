import { Component, OnInit } from '@angular/core';
import * as confetti from 'canvas-confetti';
import { DataService } from '../../../core/services/data.service';
import { ContextService } from '../../../core/services/context.service';
import { Game, Score } from '../../../shared/models/game.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rnds-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css'],
})
export class EndGameComponent implements OnInit {
  subs: Subscription[] = [];
  highestScore: Score ;
  constructor(private dataService: DataService,
    private contextService: ContextService) {}

  ngOnInit(): void {
    confetti.create()({
      particleCount: 100,
      spread: 160,
      origin: {
        y: 1,
        x: 0.5,
      },
    });
    this.subs.push(
      this.dataService
        .listenerOnCurrentGame(this.contextService.roomId)
        .subscribe((game: Game) => {
          this.highestScore =   game.scores.reduce(function(prevTeam: Score, currTeam: Score) {
            return prevTeam.value > currTeam.value ? prevTeam : currTeam;
        });
       
  }))
}
}
