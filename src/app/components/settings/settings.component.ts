import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser.interface';
import { AuthUserService } from 'src/app/services/authUser.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public userForm!: FormGroup;
  public isSaving: boolean = false;
  public isShowPassword: boolean = false;
  public errorMessage: string = '';
  public isSettingsPayment: boolean = false;
  public isAdmin: boolean = false;
  public isOpenModal: boolean = false;

  private _userSub: Subscription | null = null;

  constructor(private _authService: AuthUserService) {}

  ngOnInit(): void {
    this._initData();
    this.getUserData();
  }

  private _initData(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = user.role === 'admin';
  }

  private getUserData(): void {
    this._userSub = this._authService.userChanges.subscribe((res: IUser) => {
      if (res) {
        this.isAdmin = res.role === 'admin';
      }
    });
  }

  public navigate(value: boolean): void {
    this.isSettingsPayment = value;
  }

  public isOpenDialogHandler(value: boolean) {
    this.isOpenModal = value;
  }

  ngOnDestroy(): void {
    this._userSub?.unsubscribe();
  }
}
