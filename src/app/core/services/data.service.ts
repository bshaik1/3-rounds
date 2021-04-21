import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AngularFirestoreCollection,
  AngularFirestore,
} from '@angular/fire/firestore';
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
  readDatabse() {
    return this.firestore.collection('policies').snapshotChanges();
  }
  updateDatabse(game: Game) {
    delete game.id;
    this.firestore.doc('games/' + game.id).update(game);
  }
  deleteItem(itemId: string) {
    this.firestore.doc('games/' + itemId).delete();
  }
}
