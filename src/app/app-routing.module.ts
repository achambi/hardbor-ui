import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ParentComponent } from './parent/parent.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { HospitalListComponent } from './hospital-list/hospital-list.component';
import { SpecialityListComponent } from './speciality-list/speciality-list.component';


const routes: Routes = [{
  path: 'private',
  component: ParentComponent,
  children: [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'doctor', component: DoctorListComponent },
    { path: 'patient', component: PatientListComponent },
    { path: 'hospital', component: HospitalListComponent },
    { path: 'speciality', component: SpecialityListComponent }
  ]
},
{ path: '', redirectTo: '/private/welcome', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
