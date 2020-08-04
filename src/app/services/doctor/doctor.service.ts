import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiEndpointService } from '@services/config/api-endpoint.service';
import { ListResponse } from '@models/list-response';
import { map } from 'rxjs/operators';
import { GeneralRequest } from '@models/GeneralRequest';
import { Hospital } from '@models/hospital';
import { PersonResponse } from '@models/PersonResponse';
import { DoctorRequest } from '@models/DoctorRequest';
import { ResponseMessage } from '@models/ResponseMessage';
import { Thing } from '@models/thing';
import { PatientResponse } from '@models/PatientResponse';
import { IPersonService } from '@services/IPersonService';
import { OptionResponse } from '@models/OptionResponse';

@Injectable({
  providedIn: 'root'
})
export class DoctorService implements IPersonService {
  constructor(private httpClient: HttpClient) {
  }

  getAll(hospialId: number, page: number, limit: number): Observable<ListResponse<PersonResponse>> {
    const url = ApiEndpointService.getEndpoint(`/hospitals/${hospialId}/doctors/${page}/${limit}`);
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

  getSpecialities(id: number): Observable<Thing[]> {
    const endpoint = ApiEndpointService.getEndpoint(`/doctors/${id}/specialities`);
    return this.httpClient.get<Thing[]>(endpoint);
  }

  getPatients(id: number): Observable<PatientResponse[]> {
    const endpoint = ApiEndpointService.getEndpoint(`/doctors/${id}/patients`);
    return this.httpClient.get<PatientResponse[]>(endpoint);
  }

  add(doctor: DoctorRequest) {
    const url = ApiEndpointService.getEndpoint('/doctors');
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.post<ResponseMessage>(url, JSON.stringify(doctor), httpOptions);
  }

  addSpeciality(id: number, specialityId: number) {
    const url = ApiEndpointService.getEndpoint(`/doctors/${id}/speciality/${specialityId}`);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.httpClient.patch<ResponseMessage>(url, {}, httpOptions);
  }

  getOptions(hospitalId: number): Observable<OptionResponse[]> {
    const endpoint = ApiEndpointService.getEndpoint(`/hospitals/${hospitalId}/doctors`);
    return this.httpClient.get<OptionResponse[]>(endpoint);
  }
}
