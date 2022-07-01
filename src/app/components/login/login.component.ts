import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/IUser.interface';
import { AuthUserService } from 'src/app/services/authUser.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginUser!: FormGroup;
  public isShowPassword: boolean = false;
  public isSaving: boolean = false;
  public errorMessage: string = '';

  constructor(private _router: Router, private _authService: AuthUserService) {}

  ngOnInit(): void {
    this._createForm();
  }

  private _createForm(): void {
    this.loginUser = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  public onShoworHidePassword(): void {
    this.isShowPassword = !this.isShowPassword;
  }

  public onLogin(): void {
    const userData: IUser = {
      id: 1,
      firstName: 'Igor',
      lastName: 'Kuzmin',
      email: this.loginUser.get('email')?.value,
      login: 'thisIsLogin',
      password: this.loginUser.get('password')?.value,
      role: 'admin',
      isDeleted: false,
    };

    this._authService.setUserToLocalStorage('user', JSON.stringify(userData));
    this._router.navigate([`main`]);
  }
}

// !THIS IS VERSION CODE FOR BACKEND
// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { Subscription } from 'rxjs';
// import { IUser } from 'src/app/interfaces/IUser.interface';
// import { AuthUserService } from 'src/app/services/authUser.service';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.scss'],
// })
// export class LoginComponent implements OnInit, OnDestroy {
//   public loginUser!: FormGroup;
//   public isShowPassword: boolean = false;
//   public isSaving: boolean = false;
//   public errorMessage: string = '';

//   private _userLoginSub: Subscription | null = null;

//   constructor(private _authService: AuthUserService, private _router: Router) { }

//   ngOnInit(): void {
//     this._createForm();
//   }

//   private _createForm(): void {
//     this.loginUser = new FormGroup({
//       email: new FormControl(null, [Validators.required, Validators.email]),
//       password: new FormControl(null, [
//         Validators.required,
//         Validators.minLength(6),
//       ]),
//     });
//   }

//   public onShoworHidePassword(): void {
//     this.isShowPassword = !this.isShowPassword;
//   }

//   public onLogin(): void {
//     const email = this.loginUser.controls['email'].value;
//     const pass = this.loginUser.controls['password'].value;
//     this.isSaving = true;

//     this._userLoginSub = this._authService.userLogin(email, pass).subscribe(
//       (res: IUser) => {
//         this._router.navigate([`main`]);
//         this._authService.userData.emit(res);
//       },
//       (err) => {
//         if (err && err.error && err.error.message) {
//           this.errorMessage = err.error.message;
//           this.isSaving = false;
//         }
//       }
//     );
//   }

//   ngOnDestroy(): void {
//     if (this._userLoginSub) {
//       this._userLoginSub.unsubscribe();
//     }
//   }
// }
