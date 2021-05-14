import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Game } from 'src/app/shared/models/game.model';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = environment.apiUrl;
  constructor(private firestore: AngularFirestore, private http: HttpClient) {}
  createRoom(options: Game) {
    return this.firestore.collection<Game>('games').add(options);
  }
  getGame(id: string | number) {
    return this.firestore.doc<Game>('games/' + id).get();
  }
  updateGame(game: Game, id: string) {
    delete game.id;
    return this.firestore.doc('games/' + id).update(game);
  }
  deleteGame(id: string) {
    this.firestore.doc('games/' + id).delete();
  }
  deleteCurrentDeadline(id: string) {
    var gameRef = this.firestore.doc<Game>('games/' + id);

    // Remove the 'capital' field from the document
    return gameRef.update({
      currentDeadline: firebase.firestore.FieldValue.delete(),
    });
  }
  listenerOnCurrentGame(id: string) {
    return this.firestore.doc('games/' + id).valueChanges();
  }
  getRandomWords(wordsPerPerson: number) {
    return this.http.get<string[]>(
      `https://random-word-api.herokuapp.com/word?number=${wordsPerPerson}`
    );
  }
}
