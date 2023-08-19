import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValueProviderService {

  constructor() { }


  private readonly updateInterval = 2000; // 2 seconds

  getRandomValues(): Observable<number[]> {
    return interval(this.updateInterval).pipe(
      map(() => this.generateRandomValues())
    );
  }

  private generateRandomValues(): number[] {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
  }

  getRandomGaugeValues(): Observable<number[]> {
    return interval(this.updateInterval).pipe(
      map(() => this.generateRandomValues())
    );
  }

  private generateRandomGaugeValues(): number[] {
    const values = [];
    for (let i = 0; i < 5; i++) {
      values.push(Math.floor(Math.random() * 100));
    }
    return values;
  }

}


