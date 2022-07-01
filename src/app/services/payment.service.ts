import { EventEmitter, Injectable } from '@angular/core';
import { IPayment } from '../interfaces/IPricing.interface';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  public paymentsChanges = new EventEmitter<IPayment[]>();
  public readyPaymentsChanges = new EventEmitter<IPayment[]>();

  constructor() { }

  public setPaymentsToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
    this.paymentsChanges.emit(JSON.parse(value || '[]'));
  }

  public setReadyPaymentsToLocatStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
    this.readyPaymentsChanges.emit(JSON.parse(value || '[]'));
  }
}


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { IPayment, IPricingUpdate } from '../interfaces/IPricing.interface';

// @Injectable({
//   providedIn: 'root',
// })
// export class PaymentService {
//   private _url: string = 'http:/rentcalculator';

//   constructor(private _http: HttpClient) { }

//   public updatePricings(pricingsList: IPricingUpdate[]): Observable<IPricingUpdate[]> {
//     return this._http.post<IPricingUpdate[]>(`${this._url}/payment-master`, pricingsList)
//   }

//   public getPricings(): Observable<IPayment> {
//     return this._http.get<IPriIPaymentcing>(`${this._url}/payment-master`)
//   }

//   public getPaymentPricings(id: number): Observable<IPayment[]> {
//     return this._http.get<IPayment[]>(`${this._url}/payment-master/${id}/pricing`);
//   }

//   public getPaymentById(id: number): Observable<IPayment[]> {
//     return this._http.get<IPayment[]>(`${this._url}/payment-master/${id}`);
//   }

//   public getPaymentByName(paymentName: string): Observable<IPayment[]> {
//     return this._http.post<IPricingUpdate[]>(`${this._url}/payment-master`, { paymentName: paymentName });
//   }

// }
