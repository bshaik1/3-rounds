import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContextService } from 'src/app/core/services/context.service';
import { DataService } from 'src/app/core/services/data.service';
import { Game, PersonDetails } from 'src/app/shared/models/game.model';

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
  constructor(
    private contextService: ContextService,
    private dataService: DataService,
    private route: ActivatedRoute
  ) {
    this.roomId = contextService.roomId;
    this.myUuid = contextService.myUuid;
    if (!this.roomId) {
      this.roomId = this.route.snapshot.params.id;
    }
    dataService.listenerOnCurrentGame(this.roomId).subscribe((game: Game) => {
      this.personDetails = game.personDetails;
      this.isAdmin = this.personDetails.find(
        (pd) => pd.uuid === this.myUuid
      )?.isAdmin;
    });
  }

  ngOnInit(): void {}
  startGame() {}
}
