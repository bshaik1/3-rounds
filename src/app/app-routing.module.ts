import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavigationComponent } from './layout/components/navigation/navigation.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        redirectTo: 'game',
        pathMatch: 'full',
      },
      {
        path: 'folder/:id',
        loadChildren: () =>
          import('./folder/folder.module').then((m) => m.FolderPageModule),
      },
      {
        path: 'game',
        loadChildren: () =>
          import('./game/game.module').then((m) => m.GameModule),
      },
    ],
  },
  {
    path: 'core',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  {
    path: 'shared',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
