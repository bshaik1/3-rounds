import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextService } from 'src/app/core/services/context.service';
import { DataService } from 'src/app/core/services/data.service';
import { Game, PersonDetails } from 'src/app/shared/models/game.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rnds-waiting-area',
  templateUrl: './waiting-area.component.html',
  styleUrls: ['./waiting-area.component.scss'],
})
export class WaitingAreaComponent implements OnInit {
  roomId: string;
  personDetails: PersonDetails[];
  myUuid: number;
  isAdmin = false;
  subs: Subscription[] = [];
  constructor(
    private contextService: ContextService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.roomId = contextService.roomId;
    this.myUuid = contextService.myUuid;
    if (!this.roomId) {
      this.roomId = this.route.snapshot.params.id;
    }
    this.subs.push(
      dataService.listenerOnCurrentGame(this.roomId).subscribe((game: Game) => {
        this.personDetails = game.personDetails;
        this.isAdmin =
          this.personDetails.find((pd) => pd.uuid === this.myUuid)?.isAdmin ??
          false;
        if (game.isStarted) {
          this.router.navigate(['/game/word-selection']);
        }
      })
    );
  }

  ngOnInit(): void {}
  startGame() {
    this.subs.push(
      this.dataService.getGame(this.roomId).subscribe((doc) => {
        if (doc.exists) {
          const game = doc.data();
          game.isStarted = true;
          this.assignTeamsRandomly(game.personDetails, game.numberOfTeams);
          this.dataService.updateGame(game, this.roomId).then((success) => {});
        } else {
          console.log('No such document!');
        }
      })
    );
  }
  assignTeamsRandomly(personDetails: PersonDetails[], numberOfTeams: number) {
    for (let index = 0; index < personDetails.length; index++) {
      personDetails[index].team = (index % numberOfTeams) + 1;
    }
  }
  ionViewDidLeave() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
