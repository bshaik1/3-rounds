import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  createRoom(options: { roomName: string; numberOfTeams: number }) {
    return this.http.post(this.apiUrl, options).pipe(
      catchError((err) => {
        console.error(err);
        return throwError(err);
      })
    );
  }
}
