import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpointService } from '@services/config/api-endpoint.service';
import { ListResponse } from '@models/list-response';
import { map } from 'rxjs/operators';
import { GeneralRequest } from '@models/GeneralRequest';
import { Hospital } from '@models/hospital';
import { OptionResponse } from '@models/OptionResponse';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number, limit: number): Observable<ListResponse<Hospital>> {
    const url = ApiEndpointService.getEndpoint(`/hospitals/${page}/${limit}`);
    return this.httpClient.get<any>(url).pipe(
      map(
        result => {
          const hospitals: Hospital[] = [];
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < result.content.length; i++) {
            const hospital: Hospital = {
              id: result.content[i].id,
              name: result.content[i].name,
              description: result.content[i].description
            };
            hospitals.push(hospital);
          }
          return new ListResponse(result.totalElements, hospitals);
        }
      )
    );
  }

  getOptions(): Observable<OptionResponse[]> {
    const endpoint = ApiEndpointService.getEndpoint('/hospitals');
    return this.httpClient.get<OptionResponse[]>(endpoint);
  }

  add(hospital: GeneralRequest) {
    const url = ApiEndpointService.getEndpoint('/hospitals');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<any>(url, JSON.stringify(hospital), httpOptions);
  }
}
