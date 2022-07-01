export interface IPayment {
  name: string;
  date: string;
  cost: number;
  isDone: boolean;
  beforeValue?: number;
  afterValue?: number;
  key?: string;
  totalPay?: number;
  count?: number;
}

export interface IPricingUpdate {
  newMeterReadings: number;
  oldMeterReadings: number;
  productId: number;
}
