import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rnds-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public appPages = [
    { title: 'Home', url: '/game', icon: 'home' },
    { title: 'Join Room', url: '/game/join-room', icon: 'log-in' },
    { title: 'Settings', url: '/settings', icon: 'cog' },
  ];
  constructor() {}

  ngOnInit(): void {}
}
