import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from '@services/doctor/doctor.service';
import { Thing } from '@models/thing';
import { PatientResponse } from '@models/PatientResponse';

@Component({
  selector: 'app-modal-doctor',
  templateUrl: './modal-doctor-patients.component.html',
  styleUrls: ['./modal-doctor-patients.component.scss']
})
export class ModalDoctorPatientsComponent implements OnInit {
  patients: PatientResponse[];


  constructor(private dialogRef: MatDialogRef<ModalDoctorPatientsComponent>,
              private doctorService: DoctorService,
              @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  ngOnInit(): void {
    this.doctorService.getPatients(this.data)
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
