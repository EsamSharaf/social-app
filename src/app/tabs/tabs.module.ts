import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

// import { Routes} from '@angular/router';
// import { FeedPage } from '../feed/feed.page';
// import { UploaderPage } from '../uploader/uploader.page';
// import { ProfilePage } from '../profile/profile.page';
// import { PostPage } from '../post/post.page';
// import { EditProfilePage } from '../edit-profile/edit-profile.page';


import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage ]
})
export class TabsPageModule {}

//, FeedPage, UploaderPage, ProfilePage, PostPage, EditProfilePage