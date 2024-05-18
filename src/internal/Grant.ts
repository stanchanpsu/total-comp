import { Data } from "dataclass";
import * as dateFns from "date-fns";

export class Grant {
  name: string = "";
  description: string = "";
  symbol: string = "";
  totalShares: number = 0.0;
  grantEquity: number = 0.0;
  grantPrice: number = 0.0;
  vestMonths: number = 1;
  firstVestDate: Date = new Date();
  lastVestDate: Date = new Date();
  vestedShares: number = 0;
  unvestedShares: number = 0;
  currentPrice: number = 0.0;
  vestedEquity: number = 0.0;
  unvestedEquity: number = 0.0;
  vestingSchedule: any[] = [];

  constructor(
    name: string,
    description: string,
    symbol: string,
    totalShares: number,
    vestMonths: number,
    firstVestDate: Date
  ) {
    this.name = name;
    this.description = description;
    this.symbol = symbol;
    this.totalShares = totalShares;
    this.vestMonths = vestMonths;
    this.firstVestDate = firstVestDate;
    this.lastVestDate = dateFns.addMonths(
      this.firstVestDate,
      this.vestMonths - 1
    );
  }

  calculateVestedShares(asOfDate: Date): void {
    if (asOfDate < this.firstVestDate) {
      this.vestedShares = 0.0;
      this.unvestedShares = this.totalShares;
    } else if (asOfDate > this.lastVestDate) {
      this.vestedShares = this.totalShares;
      this.unvestedShares = 0.0;
    } else {
      // The first_vest_date is a vest, so add 1 to the months vested.
      const monthsVested =
        dateFns.differenceInMonths(asOfDate, this.firstVestDate) + 1;
      this.vestedShares =
        this.totalShares * Math.min(monthsVested / this.vestMonths, 1.0);
      this.unvestedShares = this.totalShares - this.vestedShares;
    }
  }

  // TODO(stan): figure the rest out

  // getCurrentStockPrice(): number {
  //     const ticker = yf.Ticker(this.symbol);
  //     const price = ticker.info["currentPrice"];
  //     return price;
  // }

  // getStockPrice(date: Date): number {
  //     const ticker = yf.Ticker(this.symbol);
  //     let price = this.currentPrice;
  //     // Try up to 3 times for weekends and holidays
  //     for (let i = 1; i < 4; i++) {
  //         try {
  //             price = ticker.history({ start: date, end: relativedelta(date, { days: +i }) })["Close"][0];
  //             break;
  //         } catch (e) {
  //             // pass
  //         }
  //     }
  //     return price;
  // }

  // calculateVestingSchedule(): void {
  //     const vestingSchedule: any[] = [];
  //     for (let i = 0; i < this.vestMonths; i++) {
  //         const date = date_fns.addMonths(this.firstVestDate, i);
  //         // Vest price
  //         let price = this.currentPrice;
  //         const vested = date < new Date();
  //         if (vested) {
  //             price = this.getStockPrice(date);
  //         }
  //         const shares = this.totalShares / this.vestMonths;
  //         // Rounding based on which vest date
  //         const sharesRounded = date == this.firstVestDate ? Math.floor(shares) : Math.ceil(shares);
  //         const equity = Math.round(price * sharesRounded, 2);
  //         const row = [date, vested, price, sharesRounded, equity];
  //         vestingSchedule.push(row);

  //         // Add the vested_equity
  //         if (vested) {
  //             this.vestedEquity += equity;
  //         }
  //     }
  //     this.vestingSchedule = vestingSchedule;
  // }

  // getMonthsDiff(date1: Date, date2: Date): number {
  //     let months = (date2.getFullYear() - date1.getFullYear()) * 12;
  //     months += date2.getMonth() - date1.getMonth();
  //     return months;
  // }
}
