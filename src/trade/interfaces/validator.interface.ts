import { ValidationResult } from '../../common/validation/validation-result';
import { TradeSearchParams } from '../trade.search-params';

export interface TradeSearchValidator {
  validate(params: TradeSearchParams): ValidationResult;
}