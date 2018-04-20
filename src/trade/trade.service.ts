import { Component, Inject, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../common/database/database.service';
import { Mot } from './interfaces/mot.interface';
import { Vehicle } from './interfaces/vehicle.interface';
import { Rfr } from './interfaces/rfr.interface';
import { TradeSearchType } from './trade.search-type';
import { TradeSearchParams } from './trade.search-params';
import { DvsaVehicleMapper } from './db/mappers/dvsa-vehicle.mapper';
import { LoggerService } from '../common/logger/logger.service';
import { DateUtil } from '../common/util/date.util';
import { Moment } from 'moment';
import * as moment from 'moment';
import { TradeSql } from './db/sql/trade.sql';
import { DvlaVehicleMapper } from './db/mappers/dvla-vehicle.mapper';
import { DvlaVehicle } from './interfaces/dvla-vehicle.interface';

@Component()
export class TradeService {
  private dvsaVehicleMapper = new DvsaVehicleMapper();
  private dvlaVehicleMapper = new DvlaVehicleMapper();

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly logger: LoggerService,
  ) {}

  private readonly VEHICLE_PAGE_SIZE: number = 1000;

  public async search(
    searchParams: TradeSearchParams,
  ): Promise<{ vehicles: Vehicle[], dvlaVehicle: DvlaVehicle }> {
    const searchType: TradeSearchType = searchParams.getSearchType();

    try {
      // Page search.
      if (searchType === TradeSearchType.PAGE) {
        const vehicles = await this.pageSearch(
          searchParams.getPageAsNumberType(),
        );
        return { vehicles, dvlaVehicle: null };
      }

      // Day/minute search.
      if (searchType === TradeSearchType.DAY_MINUTE) {
        const vehicles = await this.dayMinuteSearch(
          searchParams.getDateAsDateType(),
          searchParams.getMinuteAsNumberType(),
        );
        return { vehicles, dvlaVehicle: null };
      }

      // Registration search.
      if (searchType === TradeSearchType.REGISTRATION) {
        const vehicles = await this.registrationSearch(
          searchParams.registration,
        );

        if (vehicles && vehicles.length > 0) {
          return { vehicles, dvlaVehicle: null };
        }

        // Fall-back to DVLA vehicle search.
        const dvlaVehicle = await this.registrationSearchDvla(
          searchParams.registration,
        );
        return { vehicles: null, dvlaVehicle };
      }
    } finally {
      this.databaseService.done();
    }
    throw new BadRequestException('Invalid search type');
  }

  private async pageSearch(page: number): Promise<Vehicle[]> {
    const startVehicleId = page * this.VEHICLE_PAGE_SIZE;
    const endVehicleId = startVehicleId + this.VEHICLE_PAGE_SIZE;

    const sqlParams = [
      startVehicleId,
      endVehicleId,
      startVehicleId,
      endVehicleId,
    ];
    const vehicles: Vehicle[] = await this.databaseService.query(
      TradeSql.dvsaVehiclesByVehicleIdRange.sql,
      sqlParams,
      this.dvsaVehicleMapper,
    );
    return vehicles;
  }

  private async dayMinuteSearch(date: Date, page: number): Promise<Vehicle[]> {
    const startDate: Moment = moment(date).clone().add(page - 1, 'm');
    const endDate: Moment = startDate.clone().add(1, 'm');

    const startDateForSql: string = DateUtil.formatDateTimeForSQL(startDate);
    const endDateForSql: string = DateUtil.formatDateTimeForSQL(endDate);

    const sqlParams = [
      startDateForSql,
      endDateForSql,
      startDateForSql,
      endDateForSql,
      endDateForSql,
      startDateForSql,
      endDateForSql,
      startDateForSql,
      endDateForSql,
      endDateForSql,
    ];
    const vehicles: Vehicle[] = await this.databaseService.query(
      TradeSql.dvsaVehiclesByDayMinute.sql,
      sqlParams,
      this.dvsaVehicleMapper,
    );
    return vehicles;
  }

  private async registrationSearch(registration: string): Promise<Vehicle[]> {
    const sqlParams = [registration, registration, registration];
    const vehicles: Vehicle[] = await this.databaseService.query(
      TradeSql.dvsaVehiclesByReg.sql,
      sqlParams,
      this.dvsaVehicleMapper,
    );
    return vehicles;
  }

  private async registrationSearchDvla(
    registration: string,
  ): Promise<DvlaVehicle> {
    const vehicle: DvlaVehicle = await this.databaseService.query(
      TradeSql.dvlaVehicleByReg.sql,
      registration,
      this.dvlaVehicleMapper,
    );
    return vehicle;
  }
}
