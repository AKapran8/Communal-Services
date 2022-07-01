import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser.interface';
import { AuthUserService } from 'src/app/services/authUser.service';

@Component({
  selector: 'app-settings-account',
  templateUrl: './settings-account.component.html',
  styleUrls: ['./settings-account.component.scss'],
})
export class SettingsAccountComponent implements OnInit, OnDestroy {
  public userForm!: FormGroup;
  public isSaving: boolean = false;
  public isShowPassword: boolean = false;
  public errorMessage: string = '';

  private _userSub: Subscription | null = null;
  constructor(private _authService: AuthUserService) {}

  ngOnInit(): void {
    this._createForm();
    this._initForm();
  }

  private _createForm(): void {
    this.userForm = new FormGroup({
      lastName: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  private _initForm(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userForm.get('lastName')?.setValue(user.lastName);
    this.userForm.get('firstName')?.setValue(user.firstName);
    this.userForm.get('email')?.setValue(user.email);
    this.userForm.get('login')?.setValue(user.login);
    this.userForm.get('password')?.setValue(user.password);
  }

  public onShoworHidePassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }

  public save(): void {
    const prevUser = JSON.parse(localStorage.getItem('user') || '{}');
    const userData: IUser = {
      id: 1,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      login: this.userForm.value.login,
      password: this.userForm.value.password,
      role: prevUser.role,
      isDeleted: false,
    };

    this._authService.setUserToLocalStorage('user', JSON.stringify(userData));
  }

  ngOnDestroy(): void {
    this._userSub?.unsubscribe();
  }
}
