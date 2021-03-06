import { ModalAddRecordComponent } from './patient-list/modal-add-record/modal-add-record.component';
import { ModalViewRecordComponent } from './patient-list/modal-view-record/modal-view-record.component';
import { ModalPatientComponent } from './patient-list/modal-add-patient/modal-patient.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParentComponent } from './parent/parent.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PatientListComponent } from './patient-list/patient-list.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http';
import { ModalSpecialityComponent } from './speciality-list/modal-speciality/modal-speciality.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ModalHospitalComponent } from './hospital-list/modal-hospital/modal-hospital.component';
import { ModalDoctorComponent } from './doctor-list/modal-doctor/modal-doctor.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ModalAddSpecialityComponent } from './doctor-list/modal-add-speciality/modal-add-speciality.component';
import { ModalDoctorSpecialitiesComponent } from './doctor-list/modal-doctor-specialities/modal-doctor-specialities.component';
import { ModalDoctorPatientsComponent } from './doctor-list/modal-doctor-patients/modal-doctor-patients.component';

@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    WelcomeComponent,
    PatientListComponent,
    DoctorListComponent,
    HospitalListComponent,
    SpecialityListComponent,
    ModalSpecialityComponent,
    ModalHospitalComponent,
    ModalDoctorComponent,
    ModalAddSpecialityComponent,
    ModalDoctorSpecialitiesComponent,
    ModalDoctorPatientsComponent,
    ModalPatientComponent,
    ModalViewRecordComponent,
    ModalAddRecordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MDBBootstrapModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
