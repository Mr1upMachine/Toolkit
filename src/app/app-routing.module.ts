import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/auth/auth.guard';
import { NoAuthGuard } from './shared/auth/no-auth.guard';
import { AppNavComponent } from './app-nav/app-nav.component';
import { NotFoundComponent } from './not-found/not-found.component';

// https://stackoverflow.com/questions/41219439/angular2-global-guard-user-has-to-be-logged-in-always
const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppNavComponent,
    children: [
      {
        path: '',
        redirectTo: 'player',
        pathMatch: 'full'
      },
      {
        path: 'player',
        loadChildren: './player/player.module#PlayerModule'
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      // { enableTracing: true }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
