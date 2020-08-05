import { PatientService } from './../../services/patient/patient.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientResponse } from '@models/PatientResponse';

@Component({
  selector: 'app-modal-doctor',
  templateUrl: './modal-view-record.component.html',
  styleUrls: ['./modal-view-record.component.scss']
})
export class ModalViewRecordComponent implements OnInit {
  patients: PatientResponse[];


  constructor(private dialogRef: MatDialogRef<ModalViewRecordComponent>,
              private patientService: PatientService,
              @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  ngOnInit(): void {
    this.patientService.getRecord(this.data)
      .subscribe(patients => {
        this.patients = patients;
      }, error => {
        console.log(error);
      });
  }


  exit(): void {
    this.dialogRef.close();
  }
}
