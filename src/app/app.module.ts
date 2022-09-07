import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeEffects } from "./store/home/home.effects";
import { StoreModule } from "@ngrx/store";
import { metaReducers, reducers, routerFeatureKey } from "./store/app.store";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { environment } from "../environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { EffectsModule } from "@ngrx/effects";

export const EFFECTS = [
 HomeEffects,
];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule.forRoot({stateKey: routerFeatureKey}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(EFFECTS),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
