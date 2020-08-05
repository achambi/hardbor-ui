import { PersonRequest } from './../../models/PersonRequest';
import { PatientService } from './../../services/patient/patient.service';
import { Component, OnInit } from '@angular/core';
import { GeneralRequest } from '@models/GeneralRequest';
import { MatDialogRef } from '@angular/material/dialog';
import { HospitalService } from '@services/hospital/hospital.service';
import { DoctorService } from '@services/doctor/doctor.service';
import { DoctorRequest } from '@models/DoctorRequest';
import { DatePipe } from '@angular/common';
import { OptionResponse } from '@models/OptionResponse';
import { SpecialityService } from '@services/speciality/speciality.service';

@Component({
  selector: 'app-modal-patient',
  templateUrl: './modal-patient.component.html',
  styleUrls: ['./modal-patient.component.scss'],
  providers: [DatePipe]
})
export class ModalPatientComponent implements OnInit {
  hospitalId: number;
  name: string;
  lastName: string;
  address: string;
  birthDate: Date;
  birthDateStr: string;
  specialityId: number;
  hospitalOptions: OptionResponse[];
  specialityOptions: OptionResponse[];


  constructor(private dialogRef: MatDialogRef<ModalPatientComponent>,
              private readonly datePipe: DatePipe,
              private hospitalService: HospitalService,
              private patientService: PatientService) {
  }

  ngOnInit(): void {
    this.birthDate = null;
    this.birthDateStr = '';
    this.hospitalService.getOptions()
      .subscribe(options => {
        this.hospitalOptions = options;
      }, error => {
        console.log(error);
      });
    this.hospitalId = 1;
  }


  onBirthDateChange($event: any) {
    this.birthDateStr = this.datePipe.transform($event, 'MM/dd/yyyy');
  }

  exit(): void {
    this.dialogRef.close();
  }

  save() {
    const patient: PersonRequest = {
      address: this.address,
      birthDate: this.birthDateStr,
      hospitalId: this.hospitalId,
      lastName: this.lastName,
      name: this.name
    };

    let resultEndpoint = '';
    this.patientService.add(patient)
      .subscribe(response => {
        console.log(response);
        resultEndpoint = response.message;
      }, result => {
        console.log(result);
      });
    this.dialogRef.close(resultEndpoint);
  }
}
