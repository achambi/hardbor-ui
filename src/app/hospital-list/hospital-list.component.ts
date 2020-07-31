import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HospitalDataSource } from '../data-sources/hospital-data-source';
import { HospitalService } from '@services/hospital/hospital.service';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { ModalHospitalComponent } from './modal-hospital/modal-hospital.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.scss']
})
export class HospitalListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'description'];
  hospitalDataSource: HospitalDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private title: Title, private hospitalService: HospitalService) {
    this.title.setTitle('Lista de Hospitales');
  }

  ngOnInit(): void {
    this.hospitalDataSource = new HospitalDataSource(this.hospitalService);
    this.hospitalDataSource.load();
  }

  ngAfterViewInit(): void {
    this.hospitalDataSource.counter$
      .pipe(
        tap((count) => {
          this.paginator.length = count;
        })).subscribe();

    this.paginator.page
      .pipe(
        tap(() => this.load())
      ).subscribe();
  }

  load(): void {
    this.hospitalDataSource.load(this.paginator.pageIndex, this.paginator.pageSize);
  }

  openAddHospital(): void {
    const dialogRef = this.dialog.open(ModalHospitalComponent, {
      width: '50%',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((resultMessage: boolean) => {
      console.log(resultMessage);
      this.load();
      this.paginator.pageIndex = 0;
    });
  }
}
