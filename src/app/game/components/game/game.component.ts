import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextService } from 'src/app/core/services/context.service';

@Component({
  selector: 'rnds-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contextService: ContextService
  ) {
    this.contextService.title.next('New Game');
  }

  ngOnInit(): void {}
  navigateToOptions() {
    this.router.navigate(['./options'], { relativeTo: this.route });
  }
  navigateToJoinRoom() {
    this.router.navigate(['./join-room'], { relativeTo: this.route });
  }
}
