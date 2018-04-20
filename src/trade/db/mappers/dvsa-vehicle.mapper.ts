import { Mapper } from 'common/database/mapper.interface';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { Mot } from '../../interfaces/mot.interface';
import { Rfr } from '../../interfaces/rfr.interface';
import { DateUtil } from '../../../common/util/date.util';

export class DvsaVehicleMapper implements Mapper<Vehicle[]> {
  private static readonly ODOMETER_RESULT_TYPE_ARRAY = [
    {db: 'OK', api: 'READ'},
    {db: 'NOT_READ', api: 'UNREADABLE'},
    {db: 'NO_METER', api: 'NO_ODOMETER'},
  ];

  private readonly odometerResultTypes = new Map(
    DvsaVehicleMapper.ODOMETER_RESULT_TYPE_ARRAY.map<[string, string]>(ort => [ort.db, ort.api]),
  );

  /**
   * Expands flat dataset from the sql query.
   * @param rows the db query results
   */
  public map(rows: any[]): Vehicle[] {
    const vehicles: Vehicle[] = [];
    if (rows && rows.length > 0) {
      for (const row of rows) {

        // The vehicle.
        let vehicle: Vehicle = vehicles.find(
          v => v.vehicleId === row.vehicle_id,
        );

        if (!vehicle) {
          vehicle = {
            vehicleId: row.vehicle_id,
            registration: row.registration,
            make: row.make_name,
            model: row.model_name,
            firstUsedDate: DateUtil.formatDate(new Date(row.first_used_date)),
            fuelType: row.fuel_type,
            primaryColour: row.primary_colour,
            motTests: [],
          };
          vehicles.push(vehicle);
        }

        // An mot for the vehicle.
        let mot: Mot = vehicle.motTests.find(
          m => m.motTestNumber === row.mot_test_number,
        );
        if (!mot) {
          mot = {
            completedDate: DateUtil.formatDateTime(new Date(row.mot_test_completed_date)),
            testResult: row.test_result,
            expiryDate: (row.expiry_date ? DateUtil.formatDate(new Date(row.expiry_date)) : null),
            odometerValue: row.odometer_value,
            odometerUnit: row.odometer_unit,
            odometerResultType: this.odometerResultTypes.get(row.odometer_result),
            motTestNumber: row.mot_test_number,
            rfrAndComments: [],
          };
          vehicle.motTests.push(mot);
        }

        // An rfr for the vehicle's mot.
        if (row.rfr_id) {
          const rfr: Rfr = {
            text: row.rfr_and_comments,
            type: row.rfr_type,
            dangerous: row.is_rfr_dangerous === 1,

          };
          mot.rfrAndComments.push(rfr);
        }
      }
    }
    return vehicles;
  }
}
