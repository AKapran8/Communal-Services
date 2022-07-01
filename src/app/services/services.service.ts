import { EventEmitter, Injectable } from '@angular/core';
import { IService } from '../interfaces/IService.interface';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  public servicesChanges = new EventEmitter<IService[]>();

  constructor() {}

  public setServiсesToLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
    this.servicesChanges.emit(JSON.parse(value || '{}'));
  }
}

// import { HttpClient } from "@angular/common/http";
// import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";
// import { IProductCreate, IProductCreate } from "../interfaces/IService.interface";

// @Injectable({
//   providedIn: 'root',
// })
// export class ServicesService {
//   private _url: string = 'http:/rentcalculator';

//   constructor(private _http: HttpClient) { }

//   public getAllProducts(): Observable<IProductCreate[]> {
//     return this._http.get<IProductCreate[]>(`${this._url}/product/all`);
//   }

//   public getProductById(productId: number): Observable<IProductCreate> {
//     return this._http.get<IProductCreate>(`${this._url}/${productId}`)
//   }

//   public updateSingleProductPrice(productName: string, productPrice: number): Observable<IProductCreate> {
//     const updateProductData: IProductCreate = {
//       productName: productName,
//       singlePrice: productPrice
//     };

//     return this._http.put<IProductCreate>(`${this._url}/product/update-price`, updateProductData);
//   }

//   public updateProducts(productsList: IProductCreate[]): Observable<IProductCreate[]> {
//     return this._http.put<IProductCreate[]>(`${this._url}/product/update-price-bulk`, productsList)
//   }

//   public createNewProduct(productName: string, productPrice: number): Observable<IProductCreate> {
//     const body = {
//       productName: productName,
//       singlePrice: productPrice
//     };

//     return this._http.post<IProductCreate>(this._url, body);
//   }

// }
