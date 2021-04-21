import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './components/game/game.component';
import { IonicModule } from '@ionic/angular';
import { OptionsComponent } from './components/options/options.component';

@NgModule({
  declarations: [GameComponent, OptionsComponent],
  imports: [CommonModule, GameRoutingModule, IonicModule],
})
export class GameModule {}
