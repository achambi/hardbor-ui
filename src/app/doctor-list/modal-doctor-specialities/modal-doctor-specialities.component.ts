import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from '@services/doctor/doctor.service';
import { Thing } from '@models/thing';

@Component({
  selector: 'app-modal-doctor',
  templateUrl: './modal-doctor-specialities.component.html',
  styleUrls: ['./modal-doctor-specialities.component.scss']
})
export class ModalDoctorSpecialitiesComponent implements OnInit {
  specialities: Thing[];


  constructor(private dialogRef: MatDialogRef<ModalDoctorSpecialitiesComponent>,
              private doctorService: DoctorService,
              @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  ngOnInit(): void {
    this.doctorService.getSpecialities(this.data)
      .subscribe(specialities => {
        this.specialities = specialities;
      }, error => {
        console.log(error);
      });
  }


  exit(): void {
    this.dialogRef.close();
  }
}
