import * as dvlaVehicleByRegSql from '../sql/dvla-vehicle-by-reg.sql';
import * as dvsaVehiclesByRegSql from '../sql//dvsa-vehicles-by-reg.sql';
import * as dvsaVehiclesByDayMinuteSql from '../sql/dvsa-vehicles-by-day-min.sql';
import * as dvsaVehiclesByVehicleIdRangeSql from '../sql/dvsa-vehicles-by-id-range.sql';

export class TradeSql {
  public static readonly dvlaVehicleByReg = dvlaVehicleByRegSql;
  public static readonly dvsaVehiclesByReg = dvsaVehiclesByRegSql;
  public static readonly dvsaVehiclesByDayMinute = dvsaVehiclesByDayMinuteSql;
  public static readonly dvsaVehiclesByVehicleIdRange = dvsaVehiclesByVehicleIdRangeSql;
}
