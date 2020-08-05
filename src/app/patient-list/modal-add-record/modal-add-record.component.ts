import { PersonRequest } from '../../models/PersonRequest';
import { PatientService } from '../../services/patient/patient.service';
import { Component, OnInit, Inject } from '@angular/core';
import { GeneralRequest } from '@models/GeneralRequest';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HospitalService } from '@services/hospital/hospital.service';
import { DoctorService } from '@services/doctor/doctor.service';
import { DoctorRequest } from '@models/DoctorRequest';
import { DatePipe } from '@angular/common';
import { OptionResponse } from '@models/OptionResponse';
import { SpecialityService } from '@services/speciality/speciality.service';
import { RecordRequest } from '@models/RecordRequest';

@Component({
  selector: 'app-modal-add-record',
  templateUrl: './modal-add-record.component.html',
  styleUrls: ['./modal-add-record.component.scss'],
  providers: [DatePipe]
})
export class ModalAddRecordComponent implements OnInit {
  hospitalId: number;
  doctorId: number;
  description: string;
  recordDate: Date;
  recordDateStr: string;
  hospitalOptions: OptionResponse[];
  doctorOptions: OptionResponse[];


  constructor(private dialogRef: MatDialogRef<ModalAddRecordComponent>,
              private readonly datePipe: DatePipe,
              private hospitalService: HospitalService,
              private doctorService: DoctorService,
              private patientService: PatientService,
              @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  ngOnInit(): void {
    this.recordDate = null;
    this.recordDateStr = '';

    this.hospitalService.getOptions()
      .subscribe(options => {
        this.hospitalOptions = options;
      }, error => {
        console.log(error);
      });
    this.hospitalId = 1;

    this.doctorService.getOptions(this.hospitalId)
      .subscribe(options => {
        this.doctorOptions = options;
      }, error => {
        console.log(error);
      });
  }


  onRecordDateChange($event: any) {
    this.recordDateStr = this.datePipe.transform($event, 'MM/dd/yyyy');
  }

  onHospitalChange($event: any) {
    this.doctorService.getOptions($event.value)
      .subscribe(options => {
        this.doctorOptions = options;
      }, error => {
        console.log(error);
      });
  }
  exit(): void {
    this.dialogRef.close();
  }

  save() {
    const record: RecordRequest = {
      doctorId: this.doctorId,
      date: this.recordDateStr,
      description: this.description
    };

    let resultEndpoint = '';
    this.patientService.addRecord(this.data, record)
      .subscribe(response => {
        console.log(response);
        resultEndpoint = response.message;
      }, result => {
        console.log(result);
      });
    this.dialogRef.close(resultEndpoint);
  }
}
