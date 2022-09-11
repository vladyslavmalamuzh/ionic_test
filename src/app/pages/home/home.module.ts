import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { CardModule } from '../../components/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
