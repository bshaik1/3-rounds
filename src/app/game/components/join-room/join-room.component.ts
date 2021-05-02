import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextService } from 'src/app/core/services/context.service';
import { DataService } from 'src/app/core/services/data.service';
import { PersonDetails } from 'src/app/shared/models/game.model';

@Component({
  selector: 'rnds-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss'],
})
export class JoinRoomComponent implements OnInit {
  roomClosed = false;
  constructor(
    private dataService: DataService,
    private contextService: ContextService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  joinRoom(id: string | number, name: string | number) {
    this.dataService.getGame(id).subscribe((doc) => {
      if (doc.exists) {
        const game = doc.data();
        // If game already started dont join.
        if (game.roomClosed) {
          this.roomClosed = true;
          return;
        } else {
          this.roomClosed = false;
        }
        const currentPerson = new PersonDetails({ name });
        this.contextService.roomId = id as string;
        this.contextService.myUuid = currentPerson.uuid;
        game.personDetails.push({ ...currentPerson });
        this.dataService.updateGame(game, id as string).then((success) => {
          this.router.navigate(['../waiting-area'], { relativeTo: this.route });
        });
      } else {
        console.log('No such document!');
      }
    });
  }
}
