import { Component, OnInit } from '@angular/core';
import { GeneralRequest } from '@models/generalRequest';
import { MatDialogRef } from '@angular/material/dialog';
import { HospitalService } from '@services/hospital/hospital.service';
import { DoctorService } from '@services/doctor/doctor.service';
import { DoctorRequest } from '@models/DoctorRequest';
import { DatePipe } from '@angular/common';
import { OptionResponse } from '@models/OptionResponse';

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
  options: OptionResponse[];


  constructor(private dialogRef: MatDialogRef<ModalDoctorComponent>,
              private readonly datePipe: DatePipe,
              private doctorService: DoctorService,
              private hospitalService: HospitalService) {
  }

  ngOnInit(): void {
    this.birthDate = null;
    this.birthDateStr = '';
    this.hospitalService.getSamples()
      .subscribe(next => {
        this.options = next.data;
      }, error => {
        console.log(error);
      })
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
    let resultEndpoint = false;
    this.doctorService.add(doctor)
      .subscribe(response => {
        console.log(response);
        resultEndpoint = true;
      }, result => {
        console.log(result);
      });
    this.dialogRef.close(resultEndpoint);
  }
}
