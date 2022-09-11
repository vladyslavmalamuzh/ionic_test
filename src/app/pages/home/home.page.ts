import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ICardModel } from '../../services/http/models/cards.model';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { HomeSelectors } from '../../store/home/home.selectors';
import { FormBuilder } from '@angular/forms';
import { HomeActions } from '../../store/home/home.actions';
import {
  IStorageKeys,
  StorageService,
} from '../../services/utils/storage.service';

enum SearcForm {
  SEARCH = 'SEARCH',
}
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  public cards$: Observable<ICardModel[]>;
  public searchForm = this.fb.group({
    [SearcForm.SEARCH]: [''],
  });
  public searchActive$ = new Subject<boolean>();
  public cacheSearchCards$: Observable<ICardModel[]>;

  constructor(
    private store$: Store,
    private fb: FormBuilder,
    private storage: StorageService
  ) {}

  public async ngOnInit() {
    this.cards$ = this.store$.select(HomeSelectors.selectCards);
    this.cacheSearchCards$ = this.store$.select(
      HomeSelectors.selectSearchCards
    );
  }
  public async ngAfterViewInit() {
    const search = await this.storage.get(IStorageKeys.SEARCH);
    this.searchForm.controls[SearcForm.SEARCH].setValue(search);
    search ? await this.search() : null;
  }

  public async search() {
    this.searchForm.controls[SearcForm.SEARCH].value.length > 0
      ? this.searchActive$.next(true)
      : this.searchActive$.next(false);
    await this.storage.set(
      IStorageKeys.SEARCH,
      this.searchForm.controls[SearcForm.SEARCH].value
    );
    console.log(await this.storage.get(IStorageKeys.SEARCH));
    this.store$.dispatch(
      HomeActions.cacheSearch({
        value: this.searchForm.controls[SearcForm.SEARCH].value.toLowerCase(),
      })
    );
  }
  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
      // document location reload only needs to test Ionic storage. This approach is forbidden in SPA applications!
      document.location.reload();
    }, 3000);
  }
}
