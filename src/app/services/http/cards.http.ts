import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { ICardModel } from './models/cards.model';
import { Observable } from 'rxjs';
import { HTTP_ROUTING } from './routing';
/*
Also we could use HttpClientJsonpModule 
to avoid cors from backend, 
but here its not needed, 
because we get data from local file
*/
@Injectable({
  providedIn: 'root',
})
export class CardsHttpService {
  constructor(private http: HttpClient) {}

  public getCards(): Observable<ICardModel[]> {
    return this.http.get<ICardModel[]>(HTTP_ROUTING.cards.getCards);
  }
}
