import { Component, OnInit } from '@angular/core';
import { GeneralRequest } from '@models/GeneralRequest';
import { MatDialogRef } from '@angular/material/dialog';
import { SpecialityService } from '@services/speciality/speciality.service';

@Component({
  selector: 'app-modal-speciality',
  templateUrl: './modal-speciality.component.html',
  styleUrls: ['./modal-speciality.component.scss']
})
export class ModalSpecialityComponent implements OnInit {
  name: string;
  description: string;

  constructor(private dialogRef: MatDialogRef<ModalSpecialityComponent>,
              private specialityService: SpecialityService) {
  }

  ngOnInit(): void {
  }

  exit(): void {
    this.dialogRef.close();
  }

  save() {
    const generalRequest: GeneralRequest = {
      name: this.name,
      description: this.description
    };
    let resultEndpoint = false;
    this.specialityService.add(generalRequest)
      .subscribe(response => {
        console.log(response);
        resultEndpoint = true;
      }, result => {
        console.log(result);
      });
    this.dialogRef.close(resultEndpoint);
  }
}
