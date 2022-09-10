import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeActions } from './store/home/home.actions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store$: Store) {}
  public ngOnInit(): void {
    this.store$.dispatch(HomeActions.loadCards());
  }
}
