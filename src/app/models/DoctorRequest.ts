import { PersonRequest } from './PersonRequest';

export interface DoctorRequest extends PersonRequest {
  specialityId: number;
}
