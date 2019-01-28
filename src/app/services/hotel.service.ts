import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Hotel} from './hotel';
import {HOTELS} from './mock-hotels';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor() { }

  getHotels(): Observable<Hotel[]> {
    return of(HOTELS);
  }

}
