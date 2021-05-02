import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PersonDetails, Words } from 'src/app/shared/models/game.model';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  title = new BehaviorSubject<string>(null);
  myUuid: number;
  roomId: string;
  unplayedWords: Words[];
  players: PersonDetails[];
  playedWords: Words[];
  myTeam: number;
  constructor() {
    //TODO: Remove these lines. Only for testing;
    this.myUuid = 1690195;
    this.roomId = 'FY1xOe6FHP4qC4DOSdLs';
  }
}
