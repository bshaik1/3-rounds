import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextService } from 'src/app/core/services/context.service';
import { DataService } from 'src/app/core/services/data.service';
//import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
@Component({
  selector: 'rnds-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  optionsFormGroup: FormGroup;
  constructor(
    private contextService: ContextService,
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute //private uniqueDeviceID: UniqueDeviceID
  ) {
    this.contextService.title.next('Options');
    this.optionsFormGroup = new FormGroup({
      roomName: new FormControl(),
      numberOfTeams: new FormControl(),
      wordsPerPerson: new FormControl(),
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
    const gameDetails = this.optionsFormGroup.value;
    const uuid = Math.round(Math.random() * 3000000 + Math.random() * 1000000);
    gameDetails.personDetails[0].uuid = uuid;
    this.contextService.myUuid = uuid;
    // Save uuid to local storage
    this.dataService.createRoom(gameDetails).then((success) => {
      that.contextService.roomId = success.id;
      this.router.navigate(['../waiting-area'], { relativeTo: this.route });
    });
  }
}
