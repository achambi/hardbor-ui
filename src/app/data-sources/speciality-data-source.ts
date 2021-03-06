import { BehaviorSubject, Observable, of } from 'rxjs';
import { Thing } from '@models/thing';
import { SpecialityService } from '@services/speciality/speciality.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';
import { CONSTANTS } from '@constants';
import { ListResponse } from '@models/list-response';

export class SpecialityDataSource implements DataSource<Thing> {
  private requestSubject = new BehaviorSubject<Thing[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private countSubject = new BehaviorSubject<number>(0);
  public counter$ = this.countSubject.asObservable();

  constructor(private specialityService: SpecialityService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<Thing[]> {
    return this.requestSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.requestSubject.complete();
    this.loadingSubject.complete();
    this.countSubject.complete();
  }

  load(pageNumber = CONSTANTS.OPTIONS.DEFAULT_PAGE_INDEX_START, pageSize = CONSTANTS.OPTIONS.DEFAULT_PAGE_SIZE): void {
    this.loadingSubject.next(true);
    this.specialityService.getAll(pageNumber, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      ).subscribe((result: ListResponse<Thing>) => {
        this.requestSubject.next(result.data);
        this.countSubject.next(result.total);
      }
      );
  }
}
