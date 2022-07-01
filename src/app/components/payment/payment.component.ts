import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IPayment } from 'src/app/interfaces/IPricing.interface';
import { IService } from 'src/app/interfaces/IService.interface';
import { PaymentService } from 'src/app/services/payment.service';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  private _data: IPayment[] = [];
  public displayedData: IPayment[] = [];
  public modifiedData: IPayment[] = [];
  public columnsToDisplay: string[] = ['index', 'name', 'cost', 'date'];
  public isEditPayment: boolean = false;
  public choosedPayment!: IPayment;
  public services: IService[] = [];

  public readyPaymentDataColumn: string[] = ['name', 'totalPay', 'date'];

  public payments: any[] = [];
  public totalPay: number = 0;

  private _paymentsSub: Subscription | null = null;

  constructor(
    private _dialog: MatDialog,
    private _paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this._initData();
    this._initServicesData();

    this._paymentService.paymentsChanges.subscribe((res) => {
      if (res) {
        this._data = [...res];
        this.modifiedData = this._data;
        this.displayedData = this._data;
      }
    });
  }

  public onChoosePayment(index: number, payment: IPayment) {
    this.services = JSON.parse(localStorage.getItem('services') || '[]');
    this.choosedPayment = payment;
    this.isEditPayment = true;
    this.payments = [];
    const arr: any[] = JSON.parse(localStorage.getItem('readyPayment') || '[]');
    const newArr = arr
      .map((el) => {
        if (el.key === this.choosedPayment.name) {
          return el;
        }
      })
      .filter((element) => {
        return element !== undefined;
      });
    this.payments = [...newArr];
    this.totalPay = this.payments[this.payments.length - 1]?.totalPay;
  }

  public calculatePayment(): void {
    let totalPay = 0;
    const arr = this.payments.map((val) => {
      const count = val.afterValue - val.beforeValue;
      const payForService = count * val.cost;
      totalPay += payForService;
      val.isDone = true;
      val.totalPay = totalPay;
      const newItem = {
        afterValue: val.afterValue,
        beforeValue: val.beforeValue,
        cost: val.cost,
        count: count,
        date: val.date,
        isDone: true,
        key: val.key,
        name: val.name,
        totalPay: this.totalPay,
      };
      return newItem;
    });
    this.totalPay = totalPay;
    this.payments = arr.map((el) => {
      return { ...el, totalPay: this.totalPay };
    });
    const initDataPayment: any[] = JSON.parse(
      localStorage.getItem('readyPayment') || '[]'
    );
    const filterDataPayment = initDataPayment
      .map((el) => {
        if (el.key !== this.payments[0]?.key) {
          return el;
        } else {
          return;
        }
      })
      .filter((element) => {
        return element !== undefined;
      });

    const newArr = filterDataPayment.concat(this.payments);
    this._paymentService.setReadyPaymentsToLocatStorage(
      'readyPayment',
      JSON.stringify(newArr)
    );
  }

  public openDialog(): void {
    const dialogRef = this._dialog.open(PaymentDialogComponent, {
      panelClass: 'dialog-size',
      data: this.displayedData
    });

    dialogRef.afterClosed().subscribe((result: IPayment) => {
      if (result && result.name) {
        const initPaymentData = JSON.parse(
          localStorage.getItem('payments') || '[]'
        );
        this._paymentService.setPaymentsToLocalStorage(
          'payments',
          JSON.stringify([...initPaymentData, result])
        );
      }
    });
  }

  private _initData(): void {
    const lsData: IPayment[] = JSON.parse(
      localStorage.getItem('payments') || '[]'
    );

    const readyLsData: IPayment[] = JSON.parse(
      localStorage.getItem('readyPayment') || '[]'
    );

    readyLsData.forEach((item) => {
      lsData.forEach((el) => {
        if (el.name === item.key) {
          const newObj = {
            cost: item?.totalPay ? item.totalPay : 0,
            date: el.date,
            isDone: el.isDone,
            name: el.name,
          };
          this._data.push(newObj);
        } else {
          this._data.push(el);
        }
      });
    });
    if (this._data.length === 0) {
      this._data = lsData;
    }

    this.displayedData = this._data;
    this.modifiedData = this.displayedData;
  }

  private _initServicesData(): void {
    this._paymentsSub = this._paymentService.paymentsChanges.subscribe(
      (res) => {
        this._initData();
      }
    );
  }

  public onAddRow(): void {
    const row: IPayment = {
      key: this.choosedPayment.name,
      name: '',
      date: this.choosedPayment.date,
      cost: 0,
      count: 0,
      isDone: false,
      beforeValue: 0,
      afterValue: 0,
      totalPay: 0,
    };
    this.payments.push(row);
  }

  public changeValue(col: string, index: number, value: any): void {
    if (col === 'name') {
      this.payments[index][col] = value.value.name;
      this.payments[index]['cost'] = +value.value.cost;
    } else {
      this.payments[index][col] = +value.value;
    }
  }

  public removeRow(index: number): void {
    this.payments.splice(index, 1);
  }

  ngOnDestroy(): void {
    this._paymentsSub?.unsubscribe();
  }
}
