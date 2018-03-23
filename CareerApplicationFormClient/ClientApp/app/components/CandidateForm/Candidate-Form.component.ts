import { Component, ElementRef, ViewContainerRef } from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { CandidateFormService } from './Candidate-Form.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'CandidateForm',
    templateUrl: 'Candidate-Form.component.html',
    styleUrls:  ['Candidate-Form.component.css'],
})
export class CandidateFormComponent {

    title = 'app';
    ddlvalue: any = "NaN";
    Image: File;
    Cv: File;
    CandidateData: FormData;
    CandidateForm: any;
    constructor(private elm: ElementRef, private formBilder: FormBuilder, private candidateFormService: CandidateFormService,
        private toastr: ToastsManager, vcr: ViewContainerRef) {
        this.CandidateForm = new FormGroup({
            Fname: new FormControl('', Validators.required),
            Lname: new FormControl('', Validators.required),
            Email: new FormControl('', [Validators.required, Validators.email]),
            PhoneNumber: new FormControl('', [Validators.required, Validators.pattern("^[0-9\-\+]{9,15}$")]),
        });

       

        this.toastr.setRootViewContainerRef(vcr);
    }
    onSelect(val :any) {
        this.ddlvalue = val;
    }

    submit($event: any,value : any) {
        $event.preventDefault();
            if (this.CandidateForm.get('Fname').invalid) {
                this.showWarning("First Name Can't be Empty");
                return;
              }
            if (this.CandidateForm.get('Lname').invalid) {
                this.showWarning("Last Name Can't be Empty");
                return;
            }
            if (this.CandidateForm.get('Email').invalid) {
                this.showWarning("Please Eneter a Valid email");
                return;
            }
            if (this.CandidateForm.get('PhoneNumber').invalid) {
                this.showWarning("Please Eneter a Valid PhoneNumber");
                return;
            }

        if (this.ddlvalue == "NaN") {
            this.showWarning("Please Select a Job Role");
            return;
        }
        if (this.elm.nativeElement.querySelector('#CV').files[0] == undefined) {
            this.showWarning("Please Upload a Cv");
            return;
        }
        if (this.elm.nativeElement.querySelector('#image').files[0] == undefined) {
            this.showWarning("Please Upload an Image");
            return;
        }
        this.Cv = this.elm.nativeElement.querySelector('#CV').files[0];
        this.Image = this.elm.nativeElement.querySelector('#image').files[0];
        if (!isVailedImage(this.Image.name)) {
            this.showWarning("Invaild Image Type the Type should be: jpg,png");
            return;
        }
      
        if (!isVaildFile(this.Cv.name)) {
            this.showWarning("Invaild CV Type the Type should be: pdf, docx ,doc");
      
            return;
        }



     
        this.CandidateData = new FormData();
        this.CandidateData.append("Name", value.Fname + " " + value.Lname);
        this.CandidateData.append("Email", value.Email);
        this.CandidateData.append("AppliedToJobID", this.ddlvalue);
        this.CandidateData.append("PhoneNumber", value.PhoneNumber);
        this.CandidateData.append("CV", this.Cv);
        this.CandidateData.append("Image", this.Image);

        this.showInfo("Uploading....");
        this.candidateFormService.getAll(this.CandidateData).subscribe(respone => {
            this.showSuccess("Your Application has been submitted");
        }, error => {
            
            if (error.status === 400) {
                this.showError("You Already submitted an Application")
                return;
            }       
            this.showError('Servers are not responding')
        });

    }

    showSuccess(body: string) {
        this.toastr.success(body, 'Success!');
    }

    showError(body: string) {
        this.toastr.error(body, 'Oops!');
    }

    showWarning(body: string) {
        this.toastr.warning(body, 'Alert!');
    }
    showInfo(Body: string) {
        this.toastr.info(Body);
    }

 


    
}


function getExtension(filename: string) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

function isVailedImage(filename: string) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'jpg':
        case 'png':
            return true;
    }
    return false;
}

function isVaildFile(filename: string) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'pdf':
        case 'docx':
        case 'doc':
            return true;
    }
    return false;
}


