import { TradeSearchValidator } from '../interfaces/validator.interface';
import { ValidationResult } from '../../common/validation/validation-result';
import { TradeSearchParams } from '../trade.search-params';
import * as validator from 'validator';

export class TradePageSearchValidator implements TradeSearchValidator {
  public validate(searchParams: TradeSearchParams): ValidationResult {
    if (!validator.isNumeric(searchParams.page)) {
      return ValidationResult.error('Invalid page number');
    }
    const pageNum = Number(searchParams.page);
    if (pageNum < 0) {
      return ValidationResult.error('Invalid page number');
    }
    return ValidationResult.success();
  }
}
