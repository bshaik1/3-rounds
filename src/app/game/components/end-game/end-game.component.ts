import { Component, OnInit } from '@angular/core';
import * as confetti from 'canvas-confetti';

@Component({
  selector: 'rnds-end-game',
  templateUrl: './end-game.component.html',
  styleUrls: ['./end-game.component.css'],
})
export class EndGameComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    confetti.create()({
      particleCount: 100,
      spread: 160,
      origin: {
        y: 1,
        x: 0.5,
      },
    });
  }
}
