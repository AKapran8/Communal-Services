import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IService } from 'src/app/interfaces/IService.interface';

@Component({
  selector: 'app-services-dialog',
  templateUrl: './services-dialog.component.html',
  styleUrls: ['./services-dialog.component.scss'],
})
export class ServicesDialogComponent implements OnInit {
  public servicesForm!: FormGroup;
  public errorMessage: string = '';

  private _formSub: Subscription | null = null;

  constructor(
    private _dialogRef: MatDialogRef<ServicesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: IService[]
  ) {}

  ngOnInit(): void {
    this._initServicesForm();
  }

  private _initServicesForm(): void {
    this.servicesForm = new FormGroup({
      cost: new FormControl(null, Validators.required),
      name: new FormControl(null, Validators.required),
    });

    this._formSub = this.servicesForm.valueChanges.subscribe((res: any) => {
      this.errorMessage = '';
      this._checkNewServiceName(res?.name);
    });
  }

  public onAddService(): void {
    this.errorMessage = this._checkNewServiceName(
      this.servicesForm.get('name')?.value
    );
    if (!this.errorMessage) {
      this._formSub?.unsubscribe();
      this._dialogRef.close(this.servicesForm?.value);
    }
  }

  private _checkNewServiceName(res: string): string {
    const value = res?.trim().toLowerCase();
    const namesArray: string[] = this._data.map((el) =>
      el?.name.trim().toLowerCase()
    );
    return namesArray.includes(value)
      ? `Послуга під назвою ${value} вже існує. Будь ласка введіть нову послугу`
      : '';
  }
}
