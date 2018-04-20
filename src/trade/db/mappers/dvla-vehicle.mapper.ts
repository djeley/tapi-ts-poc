import { Vehicle } from '../../interfaces/vehicle.interface';
import { Mapper } from '../../../common/database/mapper.interface';
import { DateUtil } from '../../../common/util/date.util';
import { DvlaVehicle } from '../../interfaces/dvla-vehicle.interface';

export class DvlaVehicleMapper implements Mapper<DvlaVehicle> {
  public map(rows: any[]): DvlaVehicle {
    if (rows && rows.length === 1) {
      const vehicle: DvlaVehicle = {
        dvlaVehicleId: rows[0].dvla_vehicle_id,
        registration: rows[0].registration,
        firstRegistrationDate: DateUtil.formatDate(
          new Date(rows[0].first_registration_date),
        ),
        makeName: rows[0].make_name,
        modelName: rows[0].model_name,
        primaryColour: rows[0].primary_colour,
        secondaryColour: rows[0].secondary_colour,
        fuelType: rows[0].fuel_type,
        euClassification: rows[0].eu_classification,
        bodyTypeCode: rows[0].body_type_code,
        hasLinkedDvsaVehicle: rows[0].linked_vehicle === 1,
        motTestDueDate: DateUtil.getFirstMotDueDate(
          /* rows[0].eu_classification */ 'M1',
          rows[0].body_type_code,
          rows[0].first_registration_date,
          rows[0].linked_vehicle,
        ),
      };
      return vehicle;
    }
  }
}
