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


@NgModule({
  declarations: [
    AppComponent,
    ParentComponent,
    WelcomeComponent,
    PatientListComponent,
    DoctorListComponent,
    HospitalListComponent,
    SpecialityListComponent,
    ModalSpecialityComponent
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
    FormsModule,
    MatDialogModule,
    MDBBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
