import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DoctorService } from '@services/doctor/doctor.service';
import { DatePipe } from '@angular/common';
import { OptionResponse } from '@models/OptionResponse';
import { SpecialityService } from '@services/speciality/speciality.service';

@Component({
  selector: 'app-modal-add-speciality',
  templateUrl: './modal-add-speciality.component.html',
  styleUrls: ['./modal-add-speciality.component.scss'],
  providers: [DatePipe]
})
export class ModalAddSpecialityComponent implements OnInit {
  specialityId: number;
  specialityOptions: OptionResponse[];


  constructor(private dialogRef: MatDialogRef<ModalAddSpecialityComponent>,
              private specialityService: SpecialityService,
              private doctorService: DoctorService,
              @Inject(MAT_DIALOG_DATA) public data: number) {
  }

  ngOnInit(): void {
    this.specialityService.getOptions()
      .subscribe(options => {
        this.specialityOptions = options;
      }, error => {
        console.log(error);
      });
    this.specialityId = 1;
  }

  exit(): void {
    this.dialogRef.close();
  }

  save() {

    let resultEndpoint = '';
    this.doctorService.addSpeciality(this.data, this.specialityId)
      .subscribe(response => {
        console.log(response);
        resultEndpoint = response.message;
      }, result => {
        console.log(result);
      });
    this.dialogRef.close(resultEndpoint);
  }
}
