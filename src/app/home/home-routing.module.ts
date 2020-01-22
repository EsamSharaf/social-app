import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
    {
        path: '',
        component: HomePage,
        children: [
        {
            path: 'tabs',
            loadChildren: () => import('../feed/feed.module').then( m => m.FeedPageModule)
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
