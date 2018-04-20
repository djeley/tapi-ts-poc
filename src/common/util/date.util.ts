import * as moment from 'moment';

export class DateUtil {
  public static formatDate = date => moment(date).format('DD.MM.YYYY');

  public static formatDateTime = date => moment(date).format('DD.MM.YYYY HH:mm:ss');

  public static formatDateTimeForSQL = date => moment(date).format('YYYY-MM-DD HH:mm:ss');

  public static getFirstMotDueDate(
    euClassification,
    bodyTypeCode,
    firstRegistrationDate,
    hasLinkedVehicle,
  ) {
    if (euClassification && !hasLinkedVehicle) {
      switch (euClassification) {
        case 'M1':
          if (bodyTypeCode === '07' || bodyTypeCode === '76') {
            // Ambulance and taxi.
            return DateUtil.calculateOneYear(firstRegistrationDate);
          }
          return DateUtil.calculateThreeYears(firstRegistrationDate);
        case 'M2':
        case 'M3':
          return DateUtil.calculateOneYear(firstRegistrationDate);
        case 'L1':
        case 'L2':
        case 'L3':
        case 'L4':
        case 'L5':
        case 'L6':
        case 'N1':
          return DateUtil.calculateThreeYears(firstRegistrationDate);
        default:
          return null;
      }
    } else {
      return null;
    }
  }

  private static calculateYear(firstRegistrationDate, numYears) {
    const newDate = moment(firstRegistrationDate);
    const dayOfMonth = newDate.date();
    const month = newDate.month();

    if (dayOfMonth === 29 && month === 1) {
      newDate.add(numYears, 'y');
    } else {
      newDate.add(numYears, 'y').subtract(1, 'd');
    }

    return DateUtil.formatDate(newDate);
  }

  private static calculateOneYear(firstRegistrationDate) {
    return DateUtil.calculateYear(firstRegistrationDate, 1);
  }

  private static calculateThreeYears(firstRegistrationDate) {
    return DateUtil.calculateYear(firstRegistrationDate, 3);
  }
}
