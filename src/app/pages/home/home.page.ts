import { Component, OnInit } from '@angular/core';
import { DataService, Message } from '../../services/data.service';
import { ICardModel } from '../../services/http/models/cards.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HomeSelectors } from "../../store/home/home.selectors";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public cards$: Observable<ICardModel[]>;

  constructor(private store$: Store) {}

  ngOnInit() {
    this.cards$ = this.store$.select(HomeSelectors.selectCards);
  }

  refresh(ev) {
    setTimeout(() => {
      ev.detail.complete();
    }, 3000);
  }
}
