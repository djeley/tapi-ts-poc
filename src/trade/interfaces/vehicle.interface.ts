import { Mot } from './mot.interface';

export interface Vehicle {
  vehicleId: number;
  registration: string;
  make: string;
  model: string;
  firstUsedDate: string;
  fuelType: string;
  primaryColour: string;
  motTests: Mot[];
}