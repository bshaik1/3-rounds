import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextService } from 'src/app/core/services/context.service';
import { DataService } from 'src/app/core/services/data.service';

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
    private route: ActivatedRoute
  ) {
    this.contextService.title.next('Options');
    this.optionsFormGroup = new FormGroup({
      roomName: new FormControl(),
      numberOfTeams: new FormControl(),
    });
  }

  ngOnInit(): void {}
  createRoom() {
    this.dataService.createRoom(this.optionsFormGroup.value).then((success) => {
      this.router.navigate(['../waiting-area'], { relativeTo: this.route });
    });
  }
}
