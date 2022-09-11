import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICardModel } from '../../services/http/models/cards.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { HomeSelectors } from '../../store/home/home.selectors';
import { FormBuilder, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { take, tap } from 'rxjs/operators';

enum CalculatorForm {
  AMOUNT = 'AMOUNT',
  QUANTITY = 'QUANTITY',
}
@UntilDestroy()
@Component({
  selector: 'app-view-card',
  templateUrl: './view-card.page.html',
  styleUrls: ['./view-card.page.scss'],
})
export class ViewCardPage implements OnInit {
  public card$: Observable<ICardModel>;
  public amount: number;
  public quantity: number;
  public cardPrice: number;
  public calcForm = this.fb.group({
    [CalculatorForm.AMOUNT]: [0, [Validators.required]],
    [CalculatorForm.QUANTITY]: [0, [Validators.required]],
  });

  constructor(
    private store$: Store,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  public ngOnInit() {
    this.selectCurrentCard();
    this.updateForm();
  }

  public selectCurrentCard() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    const currentId = parseInt(id, 10);
    this.card$ = this.store$.select(HomeSelectors.selectCardById, currentId);
    this.store$
      .select(HomeSelectors.selectCardByIdPrice, currentId)
      .pipe(take(1))
      .subscribe((data) => (this.cardPrice = data));
  }

  public updateForm() {
    console.log(this.cardPrice);
    this.calcForm.controls[CalculatorForm.AMOUNT].valueChanges
      .pipe(
        untilDestroyed(this),
        tap((data) => {
          if (this.calcForm.controls[CalculatorForm.AMOUNT].touched){
            this.calcForm.controls[CalculatorForm.QUANTITY].markAsUntouched();
            this.calcForm.controls[CalculatorForm.QUANTITY].setValue(
               +(data / this.cardPrice).toFixed(1)
            );
          }
        })
      )
      .subscribe();
    this.calcForm.controls[CalculatorForm.QUANTITY].valueChanges
      .pipe(
        untilDestroyed(this),
        tap((data) => {
          if (this.calcForm.controls[CalculatorForm.QUANTITY].touched){
            this.calcForm.controls[CalculatorForm.AMOUNT].markAsUntouched();
            this.calcForm.controls[CalculatorForm.AMOUNT].setValue(
              +(data * this.cardPrice).toFixed(1)
            );
          }
        })
      )
      .subscribe();
  }

  public getBackButtonText() {
    const win = window as any;
    const mode = win && win.Ionic && win.Ionic.mode;
    return mode === 'ios' ? 'Other Products' : '';
  }

  public sum(param: number, cardPrice: number) {
    const result = this.calcForm.controls[CalculatorForm.AMOUNT].value + param;
    this.calcForm.controls[CalculatorForm.AMOUNT].setValue(+result.toFixed(1));
    this.calcForm.controls[CalculatorForm.QUANTITY].setValue(
      +(result / cardPrice).toFixed(1)
    );
  }

  public sumQuantity(param: number, cardPrice: number) {
    const result =
      this.calcForm.controls[CalculatorForm.QUANTITY].value + param;
    this.calcForm.controls[CalculatorForm.QUANTITY].setValue(+result.toFixed(1));
    this.calcForm.controls[CalculatorForm.AMOUNT].setValue(+(result * cardPrice).toFixed(1));
  }
}
