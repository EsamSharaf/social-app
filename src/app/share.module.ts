import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { LoadingComponent } from './loading/loading.component';
import { UploaderPageRoutingModule } from './uploader/uploader-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [LoadingComponent],
  exports: [LoadingComponent]
})

export class ShareModule {}
