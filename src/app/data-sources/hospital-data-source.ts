import { BehaviorSubject, Observable, of } from 'rxjs';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { CONSTANTS } from '@constants';
import { ListResponse } from '@models/list-response';
import { Hospital } from '@models/hospital';
import { HospitalService } from '@services/hospital/hospital.service';

export class HospitalDataSource implements DataSource<Hospital> {
  private requestSubject = new BehaviorSubject<Hospital[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private hospitalService: HospitalService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<Hospital[]> {
    return this.requestSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.requestSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  load(pageNumber = CONSTANTS.OPTIONS.DEFAULT_PAGE_INDEX_START, pageSize = CONSTANTS.OPTIONS.DEFAULT_PAGE_SIZE): void {
    this.loadingSubject.next(true);
    this.hospitalService.getAll(pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe((result: ListResponse<Hospital>) => {
        this.requestSubject.next(result.data);
        this.countSubject.next(result.total);
      }
      );
  }
}
