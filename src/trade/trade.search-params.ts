import { TradeSearchType } from '../trade/trade.search-type';
import * as moment from 'moment';

export class TradeSearchParams {
  private _registration: string;
  private _page: string;
  private _date: string;
  private _minute: string;

  constructor(registration: string, page: string, date: string) {
    this._registration = registration;
    this._page = page;
    this._date = date;
    // 'page' represents minutes in day/minute search.
    this._minute = this._page;
  }

  public get registration(): string {
    return this._registration;
  }

  public set registration(value: string) {
    this._registration = value;
  }

  public get page(): string {
    return this._page;
  }

  public set page(value: string) {
    this._page = value;
  }

  public get date(): string {
    return this._date;
  }

  public set date(value: string) {
    this._date = value;
  }

  public get minute(): string {
    return this._minute;
  }

  public set minute(value: string) {
    this._minute = value;
  }

  public getDateAsDateType(): Date {
    return moment(this._date).toDate();
  }

  public getPageAsNumberType(): number {
    return Number(this._page);
  }

  public getMinuteAsNumberType(): number {
    return Number(this._minute);
  }

  getSearchType(): TradeSearchType {
    if (this.registration) {
      return TradeSearchType.REGISTRATION;
    }
    if (this.date && this.page) {
      return TradeSearchType.DAY_MINUTE;
    }
    if (this.page) {
      return TradeSearchType.PAGE;
    }
    return TradeSearchType.INVALID;
  }
}
