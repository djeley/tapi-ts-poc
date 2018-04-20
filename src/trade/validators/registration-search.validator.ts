import { TradeSearchValidator } from '../interfaces/validator.interface';
import { ValidationResult } from '../../common/validation/validation-result';
import { TradeSearchParams } from '../trade.search-params';
import * as validator from 'validator';

export class TradeRegistrationSearchValidator implements TradeSearchValidator {
  public validate(searchParams: TradeSearchParams): ValidationResult {
      if (!validator.isAlphanumeric(searchParams.registration)) {
        return ValidationResult.error('Invalid registration');
      }
      return ValidationResult.success();
  }
}
