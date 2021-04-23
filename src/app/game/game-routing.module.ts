import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameScreenComponent } from './components/game-screen/game-screen.component';
import { GameComponent } from './components/game/game.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';
import { OptionsComponent } from './components/options/options.component';
import { WaitingAreaComponent } from './components/waiting-area/waiting-area.component';
import { WordSelectionComponent } from './components/word-selection/word-selection.component';

const routes: Routes = [
  { path: '', component: GameComponent },
  {
    path: 'options',
    component: OptionsComponent,
  },
  {
    path: 'waiting-area/:id',
    component: WaitingAreaComponent,
  },
  {
    path: 'waiting-area',
    component: WaitingAreaComponent,
  },
  {
    path: 'join-room',
    component: JoinRoomComponent,
  },
  {
    path: 'word-selection',
    component: WordSelectionComponent,
  },
  {
    path: 'game-screen',
    component: GameScreenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
