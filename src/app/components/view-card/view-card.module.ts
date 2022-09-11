import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewCardPage } from './view-card.page';

import { IonicModule } from '@ionic/angular';

import { ViewMessagePageRoutingModule } from './view-card-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewMessagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ViewCardPage]
})
export class ViewCardModule {}
