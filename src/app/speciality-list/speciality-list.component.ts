import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SpecialityService } from '@services/speciality/speciality.service';
import { SpecialityDataSource } from '../data-sources/speciality-data-source';
import { tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { ModalSpecialityComponent } from './modal-speciality/modal-speciality.component';
import { GeneralRequest } from '@models/GeneralRequest';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.scss']
})
export class SpecialityListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description'];
  specialityDataSource: SpecialityDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private title: Title, private specialityService: SpecialityService, public dialog: MatDialog) {
    this.title.setTitle('Lista de Especialidades');
  }

  ngOnInit(): void {
    this.specialityDataSource = new SpecialityDataSource(this.specialityService);
    this.specialityDataSource.load();
  }

  ngAfterViewInit(): void {
    this.specialityDataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })).subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.load())
      ).subscribe();
  }

  private load() {
    this.specialityDataSource.load(this.paginator.pageIndex, this.paginator.pageSize);
  }

  openAddSpeciality(): void {
    const dialogRef = this.dialog.open(ModalSpecialityComponent, {
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((resultMessage: boolean) => {
      console.log(resultMessage);
      this.load();
      this.paginator.pageIndex = 0;
    });
  }
}
