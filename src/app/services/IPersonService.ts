import { Observable } from 'rxjs';
import { ListResponse } from '@models/list-response';
import { PersonResponse } from '@models/PersonResponse';

export interface IPersonService {
  getAll(hospialId: number, page: number, limit: number): Observable<ListResponse<PersonResponse>>;
}
