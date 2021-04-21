import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './components/game.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [GameComponent],
  imports: [CommonModule, GameRoutingModule, IonicModule],
})
export class GameModule {}
