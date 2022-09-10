import { Component, OnInit } from '@angular/core';
import { DataService, Message } from '../../services/data.service';
import { ICardModel } from '../../services/http/models/cards.model';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { HomeSelectors } from '../../store/home/home.selectors';
import { FormBuilder } from '@angular/forms';
import { HomeActions } from '../../store/home/home.actions';

enum SearcForm {
  SEARCH = 'SEARCH',
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public cards$: Observable<ICardModel[]>;
  public searchForm = this.fb.group({
    [SearcForm.SEARCH]: [''],
  });
  public searchActive$ = new Subject<boolean>();
  public cacheSearchCards$: Observable<ICardModel[]>;

  constructor(private store$: Store, private fb: FormBuilder) {}

  public ngOnInit() {
    this.cards$ = this.store$.select(HomeSelectors.selectCards);
    this.cacheSearchCards$ = this.store$.select(HomeSelectors.selectSearchCards);
  }

  public search() {
    this.searchForm.controls[SearcForm.SEARCH].value.length > 0
      ? this.searchActive$.next(true)
      : this.searchActive$.next(false);
    this.store$.dispatch(
      HomeActions.cacheSearch({
        value: this.searchForm.controls[SearcForm.SEARCH].value.toLowerCase(),
      })
    );
  }
  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }
}
