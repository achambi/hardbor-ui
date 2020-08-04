import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpointService } from '@services/config/api-endpoint.service';
import { Thing } from '@models/thing';
import { ListResponse } from '@models/list-response';
import { map } from 'rxjs/operators';
import { GeneralRequest } from '@models/GeneralRequest';
import { OptionResponse } from '@models/OptionResponse';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number, limit: number): Observable<ListResponse<Thing>> {
    const url = ApiEndpointService.getEndpoint(`/specialities/${page}/${limit}`);
    return this.httpClient.get<any>(url).pipe(
      map(
        result => {
          const specialities: Thing[] = [];
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < result.content.length; i++) {
            const speciality: Thing = {
              id: result.content[i].id,
              name: result.content[i].name,
              description: result.content[i].description
            };
            specialities.push(speciality);
          }
          return new ListResponse(result.totalElements, specialities);
        }
      )
    );
  }

  getOptions(): Observable<OptionResponse[]> {
    const endpoint = ApiEndpointService.getEndpoint('/specialities');
    return this.httpClient.get<OptionResponse[]>(endpoint);
  }

  add(speciality: GeneralRequest) {
    const url = ApiEndpointService.getEndpoint('/specialities');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<any>(url, JSON.stringify(speciality), httpOptions);
  }
}
