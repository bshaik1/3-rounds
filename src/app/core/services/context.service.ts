import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContextService {
  title = new BehaviorSubject<string>(null);
  myUuid: number;
  roomId: string;
  constructor() {}
}
