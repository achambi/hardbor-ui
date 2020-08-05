import { RecordRequest } from './../../models/RecordRequest';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpointService } from '@services/config/api-endpoint.service';
import { ListResponse } from '@models/list-response';
import { map } from 'rxjs/operators';
import { PersonResponse } from '@models/PersonResponse';
import { ResponseMessage } from '@models/ResponseMessage';
import { PatientResponse } from '@models/PatientResponse';
import { IPersonService } from '@services/IPersonService';
import { PersonRequest } from '@models/PersonRequest';

@Injectable({
  providedIn: 'root'
})
export class PatientService implements IPersonService {
  constructor(private httpClient: HttpClient) {
  }

  getAll(hospialId: number, page: number, limit: number): Observable<ListResponse<PersonResponse>> {
    const url = ApiEndpointService.getEndpoint(`/hospitals/${hospialId}/patients/${page}/${limit}`);
    return this.httpClient.get<any>(url).pipe(
      map(
        result => {
          const doctors: PersonResponse[] = [];
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < result.content.length; i++) {
            const doctor: PersonResponse = {
              id: result.content[i].id,
              name: result.content[i].name,
              address: result.content[i].address,
              birthDate: result.content[i].birthDate,
              lastName: result.content[i].lastName,
              hospital: result.content[i].hospital,
              type: result.content[i].type
            };
            doctors.push(doctor);
          }
          return new ListResponse(result.totalElements, doctors);
        }
      )
    );
  }

  add(patient: PersonRequest) {
    const url = ApiEndpointService.getEndpoint('/patients');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<ResponseMessage>(url, JSON.stringify(patient), httpOptions);
  }

  addRecord(id: number, record: RecordRequest) {
    const url = ApiEndpointService.getEndpoint(`/patients/${id}/record`);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<ResponseMessage>(url, JSON.stringify(record), httpOptions);
  }

  getRecord(id: number): Observable<PatientResponse[]> {
    const endpoint = ApiEndpointService.getEndpoint(`/patients/${id}/records`);
    return this.httpClient.get<PatientResponse[]>(endpoint);
  }
}
