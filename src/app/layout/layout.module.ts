import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { IonicModule } from '@ionic/angular';
import { NavigationComponent } from './components/navigation/navigation.component';

@NgModule({
  declarations: [LayoutComponent, NavigationComponent],
  imports: [CommonModule, IonicModule, LayoutRoutingModule],
  exports: [NavigationComponent],
})
export class LayoutModule {}
