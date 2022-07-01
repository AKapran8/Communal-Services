import { Injectable, EventEmitter } from '@angular/core';
import { IUser } from '../interfaces/IUser.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  public userChanges = new EventEmitter<IUser>();

  constructor() { }

  public setUserToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
    this.userChanges.emit(JSON.parse(value || '{}'));
  }
}

// import { HttpClient } from '@angular/common/http';
// import { EventEmitter, Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import {
//   IRegisterUser,
//   ICreateUser,
//   IUser,
// } from '../interfaces/IUser.interface';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthUserService {
//   private _url: string = 'http:/rentcalculator';

//   constructor(private _http: HttpClient) {}

//   public userLogin(login: string, pass: string): Observable<IUser> {
//     return this._http.get<IUser>(
//       `${this._url}/auth?login=${login}&pass=${pass}`
//     );
//   }

//   public registerUser(login: string, pass: string): Observable<IRegisterUser> {
//     return this._http.post<IRegisterUser>(`${this._url}/register`, {
//       login: login,
//       pass: pass,
//     });
//   }

//   public createUser(createUsrData: ICreateUser): Observable<ICreateUser> {
//     return this._http.put<ICreateUser>(
//       `${this._url}/create-user/update-info`,
//       createUsrData
//     );
//   }

//   public checkUserExistHandler(login: string): Observable<IUser> {
//     return this._http.get<IUser>(
//       `${this._url}/check-user-exist?login=${login}`
//     );
//   }

//   public deleteUser(id: number): Observable<IUser> {
//     return this._http.put<IUser>(`${this._url}/delete-user/`, id);
//   }
// }
