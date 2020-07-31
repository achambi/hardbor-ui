import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpointService } from '@services/config/api-endpoint.service';
import { Speciality } from '@models/speciality';
import { ListResponse } from '@models/list-response';
import { map } from 'rxjs/operators';
import { GeneralRequest } from '@models/generalRequest';

@Injectable({
  providedIn: 'root'
})
export class SpecialityService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(page: number, limit: number): Observable<ListResponse<Speciality>> {
    const url = ApiEndpointService.getEndpoint(`/speciality/${page}/${limit}`);
    return this.httpClient.get<any>(url).pipe(
      map(
        result => {
          const specialities: Speciality[] = [];
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < result.content.length; i++) {
            const speciality: Speciality = {
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

  add(speciality: GeneralRequest) {
    const url = ApiEndpointService.getEndpoint('/speciality');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<any>(url, JSON.stringify(speciality), httpOptions);
  }
}
