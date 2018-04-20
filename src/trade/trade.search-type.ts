import { TradeSearchParams } from './trade.search-params';
import { ValidationResult } from '../common/validation/validation-result';
import { TradeDayMinuteSearchValidator } from './validators/date-page-search.validator';
import { TradeRegistrationSearchValidator } from './validators/registration-search.validator';
import { TradePageSearchValidator } from './validators/page-search.validator';
import { TradeSearchValidator } from '../trade/interfaces/validator.interface';

export class TradeSearchType {
  public static readonly REGISTRATION = new TradeSearchType(new TradeRegistrationSearchValidator());
  public static readonly DAY_MINUTE = new TradeSearchType(new TradeDayMinuteSearchValidator());
  public static readonly PAGE = new TradeSearchType(new TradePageSearchValidator());
  public static readonly INVALID = new TradeSearchType({
    validate({}): ValidationResult {
      return ValidationResult.error('Invalid search type');
    },
  } as TradeSearchValidator);

  private _validator: TradeSearchValidator;

  private constructor(validator: TradeSearchValidator) {
    this._validator = validator;
  }

  public validate(searchParams: TradeSearchParams): ValidationResult {
    return this._validator.validate(searchParams);
  }
}
