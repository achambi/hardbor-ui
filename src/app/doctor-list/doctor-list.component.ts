import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DoctorDataSource } from '../data-sources/doctor-data-source';
import { DoctorService } from '@services/doctor/doctor.service';
import { ModalDoctorComponent } from './modal-doctor/modal-.dotor.component';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'birthDate', 'address'];

  doctorDataSource: DoctorDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dialog: MatDialog, private title: Title, private doctorService: DoctorService) {
    this.title.setTitle('Lista de Doctores');
  }

  ngOnInit(): void {
    this.doctorDataSource = new DoctorDataSource(this.doctorService);
    this.doctorDataSource.load();
  }

  ngAfterViewInit(): void {
    this.doctorDataSource.counter$
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
    this.doctorDataSource.load(this.paginator.pageIndex, this.paginator.pageSize);
  }

  openAddHospital(): void {
    const dialogRef = this.dialog.open(ModalDoctorComponent, {
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
