import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Message } from '../../services/data.service';
import { ICardModel } from "../../services/http/models/cards.model";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { HomeSelectors } from "../../store/home/home.selectors";

@Component({
  selector: 'app-view-message',
  templateUrl: './view-message.page.html',
  styleUrls: ['./view-message.page.scss'],
})
export class ViewMessagePage implements OnInit {
  public message: Message;
  public card$: Observable<ICardModel>;

  constructor(
    private data: DataService,
    private store$: Store,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const currentId = parseInt(id, 10);
    console.log(id)
    // this.message = this.data.getMessageById(parseInt(id, 10));
    this.card$ = this.store$.select(HomeSelectors.selectCardById, currentId);
  }

  getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Other Products' : '';
  }
}
