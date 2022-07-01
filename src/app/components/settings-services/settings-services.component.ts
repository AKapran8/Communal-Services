import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IService } from 'src/app/interfaces/IService.interface';
import { ServicesService } from 'src/app/services/services.service';
import { ServicesDialogComponent } from '../services-dialog/services-dialog.component';

@Component({
  selector: 'app-settings-services',
  templateUrl: './settings-services.component.html',
  styleUrls: ['./settings-services.component.scss'],
})
export class SettingsServicesComponent implements OnInit, OnDestroy {
  @Output() isOpenDilog = new EventEmitter<boolean>();

  private _data: IService[] = [];
  public displayedData: IService[] = [];
  public modifiedData: IService[] = [];
  public columnsToDisplay: string[] = ['index', 'name', 'cost'];

  private _servicesSub: Subscription | null = null;

  constructor(
    private _dialog: MatDialog,
    private _servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this._initData();
    this._initServicesData();
  }

  private _initData(): void {
    const lsData: IService[] = JSON.parse(
      localStorage.getItem('services') || '[]'
    );
    this._data = lsData;
    this.displayedData = this._data;
    this.modifiedData = this.displayedData;
  }

  private _initServicesData(): void {
    this._servicesSub = this._servicesService.servicesChanges.subscribe(
      (res) => {
        this._initData();
      }
    );
  }

  private _fetchValue(value: string): void {
    localStorage.setItem('services', value);
  }

  public costChanges(event: any, element: IService, index: number) {
    const value = +event.target.value;

    const newObj = { ...element, cost: value };

    const newArr = this.displayedData.map((el, i) => {
      if (index === i) {
        return newObj;
      }
      return el;
    });
    this.modifiedData = [...newArr];
  }

  public saveValues(): void {
    this._fetchValue(JSON.stringify(this.modifiedData));
  }

  public openDialog(): void {
    const dialogRef = this._dialog.open(ServicesDialogComponent, {
      panelClass: 'dialog-size',
      data: this.displayedData
    });
    this.isOpenDilog.emit(true);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const initServicesData = JSON.parse(
          localStorage.getItem('services') || '[]'
        );
        this._servicesService.setServiсesToLocalStorage(
          'services',
          JSON.stringify([...initServicesData, result])
        );
      }
      this.isOpenDilog.emit(false);
    });
  }

  ngOnDestroy(): void {
    this._servicesSub?.unsubscribe();
  }
}
