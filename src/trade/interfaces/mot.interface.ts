import { Rfr } from './rfr.interface';

export interface Mot {
  completedDate: string;
  testResult: string;
  expiryDate: string;
  odometerValue: number;
  odometerUnit: string;
  odometerResultType: string;
  motTestNumber: string;
  rfrAndComments: Rfr[];
}
