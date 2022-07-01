import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser.interface';
import { AuthUserService } from 'src/app/services/authUser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userName: string = '';
  public lastName: string = '';

  private _userSub: Subscription | null = null;

  constructor(
    private _authUserService: AuthUserService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this._initData();
    this._initUserData();
  }

  private _initData(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userName = user.firstName;
    this.lastName = user.lastName;
  }

  private _initUserData(): void {
    this._userSub = this._authUserService.userChanges.subscribe((res) => {
      if (res) {
        this.userName = res.firstName;
        this.lastName = res.lastName;
      }
    });
  }

  public closeAccount(): void {
    this._route.navigate(['']);
    localStorage.removeItem('user');
    this.userName = '';
    this.lastName = '';
  }

  ngOnDestroy(): void {
    this._userSub?.unsubscribe();
  }
}
