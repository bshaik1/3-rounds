import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';
import { OptionsComponent } from './components/options/options.component';
import { WaitingAreaComponent } from './components/waiting-area/waiting-area.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  {
    path: 'options',
    component: OptionsComponent,
  },
  {
    path: 'waiting-area',
    component: WaitingAreaComponent,
  },
  {
    path: 'join-room',
    component: JoinRoomComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
