import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextService } from 'src/app/core/services/context.service';
import { DataService } from 'src/app/core/services/data.service';
import { Game, generateUuid } from 'src/app/shared/models/game.model';
//import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
@Component({
  selector: 'rnds-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  optionsFormGroup: FormGroup;
  get nameFormControl() {
    return this.optionsFormGroup
      .get('personDetails')
      .get('0')
      .get('name') as FormControl;
  }
  constructor(
    private contextService: ContextService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute //private uniqueDeviceID: UniqueDeviceID
  ) {
    this.contextService.title.next('Options');
    this.optionsFormGroup = new FormGroup({
      roomName: new FormControl(),
      numberOfTeams: new FormControl('2'),
      wordsPerPerson: new FormControl('3'),
      personDetails: new FormArray([
        new FormGroup({
          name: new FormControl(),
          uuid: new FormControl(),
        }),
      ]),
    });
  }

  ngOnInit(): void {}
  createRoom() {
    const that = this;
    const gameDetails = this.optionsFormGroup.value as Game;
    gameDetails.isStarted = false;
    const uuid = generateUuid();
    gameDetails.personDetails[0].uuid = uuid;
    gameDetails.personDetails[0].isAdmin = true;
    gameDetails.words = [];
    gameDetails.played = [];
    gameDetails.unplayed = [];
    gameDetails.roundNumber = 1;
    // Initialize scores for teams
    gameDetails.scores = [];
    for (let i = 0; i < gameDetails.numberOfTeams; i++) {
      gameDetails.scores.push({ team: i + 1, value: 0, log: [] });
    }
    // Save in context service
    this.contextService.myUuid = uuid;
    // Save uuid to local storage
    this.dataService.createRoom(gameDetails).then((success) => {
      that.contextService.roomId = success.id;
      this.router.navigate(['../waiting-area'], { relativeTo: this.route });
    });
  }
}
