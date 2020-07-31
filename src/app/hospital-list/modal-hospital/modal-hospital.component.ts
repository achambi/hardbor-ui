import { Component, OnInit } from '@angular/core';
import { GeneralRequest } from '@models/generalRequest';
import { MatDialogRef } from '@angular/material/dialog';
import { HospitalService } from '@services/hospital/hospital.service';

@Component({
  selector: 'app-modal-hospital',
  templateUrl: './modal-hospital.component.html',
  styleUrls: ['./modal-hospital.component.scss']
})
export class ModalHospitalComponent implements OnInit {
  hospitalName: string;
  hospitalDescription: string;

  constructor(private dialogRef: MatDialogRef<ModalHospitalComponent>,
              private hospitalService: HospitalService) {
  }

  ngOnInit(): void {
  }

  exit(): void {
    this.dialogRef.close();
  }

  save() {
    const generalRequest: GeneralRequest = {
      name: this.hospitalName,
      description: this.hospitalDescription
    };
    let resultEndpoint = false;
    this.hospitalService.add(generalRequest)
      .subscribe(response => {
        console.log(response);
        resultEndpoint = true;
      }, result => {
        console.log(result);
      });
    this.dialogRef.close(resultEndpoint);
  }
}
