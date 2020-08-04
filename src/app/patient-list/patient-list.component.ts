import { ModalAddRecordComponent } from './modal-add-record/modal-add-record.component';
import { ModalViewRecordComponent } from './modal-view-record/modal-view-record.component';
import { ModalPatientComponent } from './modal-add-patient/modal-patient.component';
import { PatientService } from './../services/patient/patient.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PersonDataSource } from '../data-sources/person-data-source';
import { DoctorService } from '@services/doctor/doctor.service';
import { OptionResponse } from '@models/OptionResponse';
import { HospitalService } from '@services/hospital/hospital.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'type', 'birthDate', 'address', 'hospital', 'addRecord', 'viewRecords'];

  patientDataSource: PersonDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  hospitalOptions: OptionResponse[];
  hospitalId: number;

  constructor(private dialog: MatDialog, private title: Title,
              private patientService: PatientService,
              private hospitalService: HospitalService) {
    this.title.setTitle('Lista de Pacientes');
  }

  ngOnInit(): void {
    this.patientDataSource = new PersonDataSource(this.patientService);
    this.hospitalService.getOptions()
      .subscribe(options => {
        this.hospitalOptions = options;
      }, error => {
        console.log(error);
      });
    this.hospitalId = 1;
    this.patientDataSource.load(this.hospitalId);
  }

  ngAfterViewInit(): void {
    this.patientDataSource.counter$
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
    this.patientDataSource.load(this.hospitalId, this.paginator.pageIndex, this.paginator.pageSize);
  }

  openAddPatient(): void {
    const dialogRef = this.dialog.open(ModalPatientComponent, {
      width: '50%',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((resultMessage: string) => {
      console.log(resultMessage);
      this.search();
    });
  }

  search() {
    this.patientDataSource.load(this.hospitalId);
    this.paginator.pageIndex = 0;
  }

  addRecord(id: number): void {
    this.dialog.open(ModalAddRecordComponent, {
      width: '50%',
      autoFocus: false,
      data: id
    });
  }

  viewRecord(id: number): void {
    this.dialog.open(ModalViewRecordComponent, {
      width: '50%',
      autoFocus: false,
      data: id
    });
  }

}

