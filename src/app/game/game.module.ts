import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './components/game/game.component';
import { IonicModule } from '@ionic/angular';
import { OptionsComponent } from './components/options/options.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JoinRoomComponent } from './components/join-room/join-room.component';
import { WaitingAreaComponent } from './components/waiting-area/waiting-area.component';
import { WordSelectionComponent } from './components/word-selection/word-selection.component';
import { GameScreenComponent } from './components/game-screen/game-screen.component';

@NgModule({
  declarations: [GameComponent, OptionsComponent, JoinRoomComponent, WaitingAreaComponent, WordSelectionComponent, GameScreenComponent],
  imports: [CommonModule, ReactiveFormsModule, GameRoutingModule, IonicModule],
})
export class GameModule {}
