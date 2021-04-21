import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ContextService } from 'src/app/core/services/context.service';

@Component({
  selector: 'rnds-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  title: Observable<string>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private contextService: ContextService
  ) {
    this.title = contextService.title;
  }

  ngOnInit() {}
}
