import { Get, Controller, Query, BadRequestException, NotFoundException } from '@nestjs/common';
import { TradeService } from './trade.service';
import { LoggerService } from '../common/logger/logger.service';
import { TradeSearchType } from './trade.search-type';
import { TradeSearchParams } from './trade.search-params';
import { ValidationResult } from 'common/validation/validation-result';
import { Vehicle } from './interfaces/vehicle.interface';
import { DvlaVehicle } from './interfaces/dvla-vehicle.interface';

@Controller()
export class TradeController {
  constructor(
    private readonly tradeService: TradeService,
    private readonly logger: LoggerService,
  ) {}

  @Get('/trade/vehicles/mot-tests')
  public async trade(
    @Query('page') page,
    @Query('date') date,
    @Query('registration') registration,
  ): Promise<Vehicle[] | DvlaVehicle> {

    this.logger.info(
      'Trade query params (registration, page, date): ',
      registration,
      page,
      date,
    );

    const searchParams: TradeSearchParams = new TradeSearchParams(registration, page, date);
    const searchType: TradeSearchType = searchParams.getSearchType();
    const validationResult: ValidationResult = searchType.validate(searchParams);

    if (validationResult.error) {
      throw new BadRequestException(validationResult.message);
    }

    const { vehicles, dvlaVehicle} = await this.tradeService.search(searchParams);

    if ((vehicles && vehicles.length > 0) || dvlaVehicle) {
      return vehicles || dvlaVehicle;
    }

    throw new NotFoundException();
  }
}
