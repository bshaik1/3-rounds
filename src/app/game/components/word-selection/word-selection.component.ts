import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContextService } from 'src/app/core/services/context.service';
import { DataService } from 'src/app/core/services/data.service';
import { Game, Words } from 'src/app/shared/models/game.model';

@Component({
  selector: 'rnds-word-selection',
  templateUrl: './word-selection.component.html',
  styleUrls: ['./word-selection.component.scss'],
})
export class WordSelectionComponent implements OnInit {
  game: Game;
  formGroupArray: FormControl[];
  subs: Subscription[] = [];
  constructor(
    private contextService: ContextService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.dataService.getGame(this.contextService.roomId).subscribe((doc) => {
        if (doc.exists) {
          this.game = doc.data();
          this.subs.push(
            this.dataService
              .getRandomWords(this.game.wordsPerPerson)
              .subscribe((randomWords) => {
                const formControls = [];
                for (let i = 0; i < this.game.wordsPerPerson; i++) {
                  formControls.push(new FormControl(randomWords[i]));
                }
                this.formGroupArray = formControls;
              })
          );
        }
      })
    );
  }
  confirmWords() {
    this.subs.push(
      this.dataService.getGame(this.contextService.roomId).subscribe((doc) => {
        if (doc.exists) {
          this.game = doc.data();
          this.formGroupArray.forEach((formControl) => {
            this.game.words.push({
              ...new Words({
                value: formControl.value,
                uuid: this.contextService.myUuid,
              }),
            });
          });
          this.dataService
            .updateGame(this.game, this.contextService.roomId)
            .then((success) => {
              this.router.navigate(['../game-screen'], {
                relativeTo: this.route,
              });
            });
        } else {
          console.log('No such document!');
        }
      })
    );
  }
  refreshRandomWords() {
    this.subs.push(
      this.dataService
        .getRandomWords(this.game.wordsPerPerson)
        .subscribe((randomWords) => {
          this.formGroupArray.forEach((fg, i) => {
            fg.setValue(randomWords[i]);
          });
        })
    );
  }
  ionViewDidLeave() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
