import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IPayment } from 'src/app/interfaces/IPricing.interface';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss'],
})
export class PaymentDialogComponent implements OnInit, OnDestroy {
  public paymentForm!: FormGroup;
  public errorMessage: string = '';

  private _nameSub: Subscription | null = null;

  constructor(
    private _dialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: IPayment[] | []
  ) {}

  ngOnInit(): void {
    this._createForm();
  }

  private _createForm(): void {
    this.paymentForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });

    this.paymentForm.get('name')?.valueChanges.subscribe(res => {
      this.errorMessage = '';
      this._checkNewPaymentName(res);
    })
  }

  public onSavePayment(): void {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    const date = `${dd}.${mm}.${yyyy}`;
    const newName = this.paymentForm.value.name;

    this.errorMessage = this._checkNewPaymentName(newName);
    if (!this.errorMessage) {
      const payment: IPayment = {
        name: this.paymentForm.value.name,
        date: date,
        cost: 0,
        isDone: false,
      };
      this._dialogRef.close(payment);
      this._nameSub?.unsubscribe();
    }

  }

  private _checkNewPaymentName(res: string): string {
    const newNameValue = res?.trim().toLowerCase();
    const paymentNames: string[] = this._data.map(el => el.name?.trim().toLocaleLowerCase());
    return paymentNames.includes(newNameValue) ? `На жаль платіжка під назвою ${this.paymentForm.value.name?.trim()} існує. Введіть будь ласка інше ім'я` : '';
  }

  ngOnDestroy(): void {
    this._nameSub?.unsubscribe();
  }
}
