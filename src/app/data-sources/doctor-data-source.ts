import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { CONSTANTS } from '@constants';
import { ListResponse } from '@models/list-response';
import { DoctorResponse } from '@models/DoctorResponse';
import { DoctorService } from '@services/doctor/doctor.service';

export class DoctorDataSource implements DataSource<DoctorResponse> {
  private requestSubject = new BehaviorSubject<DoctorResponse[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private doctorService: DoctorService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<DoctorResponse[]> {
    return this.requestSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.requestSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  load(hospitalId: number, pageNumber = CONSTANTS.OPTIONS.DEFAULT_PAGE_INDEX_START, pageSize = CONSTANTS.OPTIONS.DEFAULT_PAGE_SIZE): void {
    this.loadingSubject.next(true);
    this.doctorService.getAll(hospitalId, pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe((result: ListResponse<DoctorResponse>) => {
        this.requestSubject.next(result.data);
        this.countSubject.next(result.total);
      }
      );
  }
}
