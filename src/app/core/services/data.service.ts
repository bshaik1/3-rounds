import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from 'src/app/shared/models/game.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = environment.apiUrl;
  constructor(private firestore: AngularFirestore) {}
  createRoom(options: Game) {
    return this.firestore.collection<Game>('games').add(options);
  }
  getGame(id: string) {
    return this.firestore.doc('games/' + id).get();
  }
  updateGame(game: Game) {
    delete game.id;
    this.firestore.doc('games/' + game.id).update(game);
  }
  deleteGame(id: string) {
    this.firestore.doc('games/' + id).delete();
  }
  listenerOnCurrentGame(id: string) {
    return this.firestore.doc('games/' + id).valueChanges();
  }
}
