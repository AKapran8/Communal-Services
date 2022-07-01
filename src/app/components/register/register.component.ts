import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/IUser.interface';
import { AuthUserService } from 'src/app/services/authUser.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class FirstStepRigester implements OnInit {
  public registerUserForm!: FormGroup;
  public createUserForm!: FormGroup;
  public errorMessage: string = '';

  public isSaving: boolean = false;
  public isCreateUser: boolean = false;

  constructor(
    private _router: Router,
    private _authUserService: AuthUserService
  ) {}

  ngOnInit(): void {
    this._initRegisterForm();
    this._initCreateUserForm();
  }

  private _initRegisterForm(): void {
    this.registerUserForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  private _initCreateUserForm(): void {
    this.createUserForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      secondName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  public onCreateUser(): void {
    const userData: IUser = {
      id: 1,
      firstName: this.createUserForm.value.firstName,
      lastName: this.createUserForm.value.secondName,
      email: this.createUserForm.value.email,
      login: this.registerUserForm.value.login,
      password: this.registerUserForm.value.password,
      role: 'user',
      isDeleted: false,
    };
    this._authUserService.setUserToLocalStorage(
      'user',
      JSON.stringify(userData)
    );
    this._router.navigate([`main`]);
  }

  public onRegisterUser(): void {
    this.isCreateUser = true;
  }
}

// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Subscription } from 'rxjs';
// import { ICreateUser, IUser } from 'src/app/interfaces/IUser.interface';
// import { AuthUserService } from 'src/app/services/authUser.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.scss'],
// })
// export class FirstStepRigester implements OnInit, OnDestroy {
//   public registerUserForm!: FormGroup;
//   public createUserForm!: FormGroup;
//   public errorMessage: string = '';

//   public isSaving: boolean = false;
//   public isCreateUser: boolean = false;

//   private _registerSub: Subscription | null = null;
//   private _createUserSub: Subscription | null = null;

//   constructor(private _authService: AuthUserService) {}

//   ngOnInit(): void {
//     this._initRegisterForm();
//     this._initCreateUserForm();
//   }

//   private _initRegisterForm(): void {
//     this.registerUserForm = new FormGroup({
//       login: new FormControl(null, [Validators.required]),
//       password: new FormControl(null, [
//         Validators.required,
//         Validators.minLength(6),
//       ]),
//     });
//   }

//   private _initCreateUserForm(): void {
//     this.createUserForm = new FormGroup({
//       firstName: new FormControl(null, Validators.required),
//       secondName: new FormControl(null, Validators.required),
//       email: new FormControl(null, [Validators.required, Validators.email]),
//     });
//   }

//   public onCreateUser(): void {
//     const firstName = this.createUserForm.controls['firstName'].value;
//     const secondName = this.createUserForm.controls['lastname'].value;
//     const email = this.createUserForm.controls['email'].value;

//     const createUserData: ICreateUser = {
//       firstName: firstName,
//       secondName: secondName,
//       email: email,
//     };

//     this._createUserSub = this._authService
//       .createUser(createUserData)
//       .subscribe(
//         (res: IUser) => {
//           this._authService.userData.emit(res);
//         },
//         (err) => {
//           if (err && err.error && err.error.message) {
//             this.errorMessage = err.error.message;
//           }
//         }
//       );
//   }

//   public onRegisterUser(): void {
//     const login = this.registerUserForm.controls['login'].value;
//     const pass = this.registerUserForm.controls['password'].value;
//     this.isSaving = true;

//     this._registerSub = this._authService.registerUser(login, pass).subscribe(
//       (res) => {
//         this.isCreateUser = true;
//         this.errorMessage = "";
//       },
//       (err) => {
//         if (err && err.error && err.error.message) {
//           this.errorMessage = err.error.message;
//         }
//       }
//     );
//   }

//   ngOnDestroy(): void {
//     this._registerSub?.unsubscribe();
//     this._createUserSub?.unsubscribe();
//   }
// }
