import { Component, OnInit } from '@angular/core';
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
  constructor(
    private contextService: ContextService,
    private dataService: DataService
  ) {
    this.roomId = contextService.roomId;
    dataService.listenerOnCurrentGame(this.roomId).subscribe((game: Game) => {
      this.personDetails = game.personDetails;
    });
  }

  ngOnInit(): void {}
  startGame() {}
}
