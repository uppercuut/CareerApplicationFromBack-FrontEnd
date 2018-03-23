import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http, ConnectionBackend } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { AvailableJobs } from './components/AvailableJobs/Available-Jobs.component';
import { AvailableJobsService } from './components/AvailableJobs/Available-Jobs.service';
import { CandidateFormComponent } from './components/CandidateForm/Candidate-Form.component';
import { CandidateFormService } from './components/CandidateForm/Candidate-Form.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

@NgModule({
    declarations: [
        AppComponent,
        AvailableJobs,
      CandidateFormComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        ToastModule.forRoot()

          
    ],
   providers:[
       AvailableJobsService,
       CandidateFormService
  
   ]
})
export class AppModuleShared {
}
