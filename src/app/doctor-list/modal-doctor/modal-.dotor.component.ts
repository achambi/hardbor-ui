import { Component, OnInit } from '@angular/core';
import { GeneralRequest } from '@models/generalRequest';
import { MatDialogRef } from '@angular/material/dialog';
import { HospitalService } from '@services/hospital/hospital.service';
import { DoctorService } from '@services/doctor/doctor.service';
import { DoctorRequest } from '@models/DoctorRequest';
import { DatePipe } from '@angular/common';
import { OptionResponse } from '@models/OptionResponse';
import { SpecialityService } from '@services/speciality/speciality.service';

@Component({
  selector: 'app-modal-doctor',
  templateUrl: './modal-doctor.component.html',
  styleUrls: ['./modal-doctor.component.scss'],
  providers: [DatePipe]
})
export class ModalDoctorComponent implements OnInit {
  hospitalId: number;
  name: string;
  lastName: string;
  address: string;
  birthDate: Date;
  birthDateStr: string;
  specialityId: number;
  hospitalOptions: OptionResponse[];
  specialityOptions: OptionResponse[];


  constructor(private dialogRef: MatDialogRef<ModalDoctorComponent>,
              private readonly datePipe: DatePipe,
              private hospitalService: HospitalService,
              private specialityService: SpecialityService,
              private doctorService: DoctorService) {
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
    this.specialityService.getOptions()
      .subscribe(options => {
        this.specialityOptions = options;
      }, error => {
        console.log(error);
      });
    this.specialityId = 1;
  }


  onBirthDateChange($event: any) {
    this.birthDateStr = this.datePipe.transform($event, 'MM/dd/yyyy');
  }

  exit(): void {
    this.dialogRef.close();
  }

  save() {
    const doctor: DoctorRequest = {
      address: this.address,
      birthDate: this.birthDateStr,
      hospitalId: this.hospitalId,
      lastName: this.lastName,
      name: this.name,
      specialityId: this.specialityId,
    };

    let resultEndpoint = '';
    this.doctorService.add(doctor)
      .subscribe(response => {
        console.log(response);
        resultEndpoint = response.message;
      }, result => {
        console.log(result);
      });
    this.dialogRef.close(resultEndpoint);
  }
}
