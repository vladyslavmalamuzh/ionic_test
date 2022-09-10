import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../services/data.service';
import { ICardModel } from "../../services/http/models/cards.model";

@Component({
  selector: 'app-card',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() card: ICardModel;

  constructor() { }

  ngOnInit() {}

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }
}
