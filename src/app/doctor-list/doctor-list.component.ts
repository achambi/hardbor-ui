import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { PersonDataSource } from '../data-sources/person-data-source';
import { DoctorService } from '@services/doctor/doctor.service';
import { ModalDoctorComponent } from './modal-doctor/modal-doctor.component';
import { OptionResponse } from '@models/OptionResponse';
import { HospitalService } from '@services/hospital/hospital.service';
import { SpecialityService } from '@services/speciality/speciality.service';
import { ModalAddSpecialityComponent } from './modal-add-speciality/modal-add-speciality.component';
import { ModalDoctorSpecialitiesComponent } from './modal-doctor-specialities/modal-doctor-specialities.component';
import { ModalDoctorPatientsComponent } from './modal-doctor-patients/modal-doctor-patients.component';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'type', 'birthDate', 'address', 'hospital', 'action', 'view', 'viewPatients'];

  doctorDataSource: PersonDataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  hospitalOptions: OptionResponse[];
  hospitalId: number;

  constructor(private dialog: MatDialog, private title: Title,
    private doctorService: DoctorService,
    private hospitalService: HospitalService) {
    this.title.setTitle('Lista de Doctores');
  }

  ngOnInit(): void {
    this.doctorDataSource = new PersonDataSource(this.doctorService);
    this.hospitalService.getOptions()
      .subscribe(options => {
        this.hospitalOptions = options;
      }, error => {
        console.log(error);
      });
    this.hospitalId = 1;
    this.doctorDataSource.load(this.hospitalId);
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
    this.doctorDataSource.load(this.hospitalId, this.paginator.pageIndex, this.paginator.pageSize);
  }

  openAddDoctor(): void {
    const dialogRef = this.dialog.open(ModalDoctorComponent, {
      width: '50%',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((resultMessage: string) => {
      console.log(resultMessage);
      this.search();
    });
  }

  addSpeciality(id: number): void {
    const dialogRef = this.dialog.open(ModalAddSpecialityComponent, {
      width: '50%',
      autoFocus: false,
      data: id
    });
    dialogRef.afterClosed().subscribe((resultMessage: boolean) => {
      console.log(resultMessage);
      this.load();
      this.paginator.pageIndex = 0;
    });
  }

  search() {
    this.doctorDataSource.load(this.hospitalId);
    this.paginator.pageIndex = 0;
  }

  viewSpecialities(id: number): void {
    const dialogRef = this.dialog.open(ModalDoctorSpecialitiesComponent, {
      width: '50%',
      autoFocus: false,
      data: id
    });
  }

  viewPatients(id: number): void {
    const dialogRef = this.dialog.open(ModalDoctorPatientsComponent, {
      width: '50%',
      autoFocus: false,
      data: id
    });
  }
}
