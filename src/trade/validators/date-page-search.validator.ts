import { TradeSearchValidator } from '../interfaces/validator.interface';
import { ValidationResult } from '../../common/validation/validation-result';
import { TradeSearchParams } from '../trade.search-params';
import * as validator from 'validator';
import * as moment from 'moment';

export class TradeDayMinuteSearchValidator implements TradeSearchValidator {
  public validate(searchParams: TradeSearchParams): ValidationResult {
    if (!validator.isNumeric(searchParams.date)) {
      return ValidationResult.error('Invalid date');
    }
    const momentDate = moment(searchParams.date);
    if (!momentDate.isValid()) {
      return ValidationResult.error('Invalid date');
    }
    if (!validator.isNumeric(searchParams.page)) {
      return ValidationResult.error('Invalid page number (minute)');
    }
    const pageNum = Number(searchParams.page);
    if (pageNum < 1 || pageNum > 1440) {
      return ValidationResult.error('Invalid page number (minute)');
    }
    return ValidationResult.success();
  }
}
