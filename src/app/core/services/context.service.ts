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
  players: PersonDetails[];
  myTeam: number;
  constructor() {}
}
