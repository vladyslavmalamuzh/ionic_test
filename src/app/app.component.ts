import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeActions } from './store/home/home.actions';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store$: Store, private storage: Storage) {}

  public async ngOnInit(): Promise<void> {
    this.store$.dispatch(HomeActions.loadCards());
    await this.storage.create();
  }
}
