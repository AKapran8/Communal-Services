import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';

import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { FirstStepRigester } from './components/register/register.component';
import { MainComponent } from './components/main/main.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PaymentComponent } from './components/payment/payment.component';
import { SettingsAccountComponent } from './components/settings-account/settings-account.component';
import { SettingsServicesComponent } from './components/settings-services/settings-services.component';
import { ServicesDialogComponent } from './components/services-dialog/services-dialog.component';
import { PaymentDialogComponent } from './components/payment-dialog/payment-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FirstStepRigester,
    MainComponent,
    SettingsComponent,
    PaymentComponent,
    SettingsAccountComponent,
    SettingsServicesComponent,
    ServicesDialogComponent,
    PaymentDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatTabsModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// --PRICING CONTROLLER--

// GET: "/payment-master" //for current user

// GET: "/payment-master/{paymentMasterId}"
//   - Integer paymentMasterId

// GET: "/payment-master/{paymentMasterId}/pricing"
//   - Integer paymentMasterId

// POST: "/payment-master/{paymentMasterId}/pricing"
// [
//   {
//     "newMeterReadings": 6,
//     "oldMeterReadings": 2,
//     "productId": 1
//   },
//   {
//     "newMeterReadings": 6,
//     "oldMeterReadings": 2,
//     "productId": 2
//   }
// ]
//   - Integer paymentMasterId

// POST: "/payment-master?paymentName=:paymentName"
//   - String paymentName

// --PRODUCT CONTROLLER--

// GET: "/product/all"

// GET: "/{productId}"
//   - Integer productId

// PUT: "/product/update-price"
// {
//   "productName": "Water",
//     "singlePrice": 16.32
// }

// PUT: "/product/update-price-bulk"
// [
//   {
//     "productName": "Water",
//     "singlePrice": 16.32
//   },
//   {
//     "productName": "Gas",
//     "singlePrice": 18.33
//   }
// ]

// POST: "/product/create"
// {
//   "productName": "Gas",
//     "singlePrice": 7.23
// }
