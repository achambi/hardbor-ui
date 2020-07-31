import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpointService } from '@services/config/api-endpoint.service';
import { ListResponse } from '@models/list-response';
import { map } from 'rxjs/operators';
import { GeneralRequest } from '@models/generalRequest';
import { Hospital } from '@models/hospital';
import { DoctorResponse } from '@models/DoctorResponse';
import { DoctorRequest } from '@models/DoctorRequest';
import { ResponseMessage } from '@models/ResponseMessage';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number, limit: number): Observable<ListResponse<DoctorResponse>> {
    const url = ApiEndpointService.getEndpoint(`/doctors/${page}/${limit}`);
    return this.httpClient.get<any>(url).pipe(
      map(
        result => {
          const doctors: DoctorResponse[] = [];
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < result.content.length; i++) {
            const doctor: DoctorResponse = {
              id: result.content[i].id,
              name: result.content[i].name,
              address: result.content[i].address,
              birthDate: result.content[i].birthDate,
              lastName: result.content[i].lastName
            };
            doctors.push(doctor);
          }
          return new ListResponse(result.totalElements, doctors);
        }
      )
    );
  }

  add(doctor: DoctorRequest) {
    const url = ApiEndpointService.getEndpoint('/doctors');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<ResponseMessage>(url, JSON.stringify(doctor), httpOptions);
  }
}
