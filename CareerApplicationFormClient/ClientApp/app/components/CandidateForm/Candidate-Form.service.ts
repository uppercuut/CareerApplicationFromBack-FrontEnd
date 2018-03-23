import { Http } from "@angular/http";
import { Injectable, Inject } from "@angular/core";
import { AppComponent } from "../app/app.component";

@Injectable()
export class CandidateFormService {

    constructor(private http: Http) {
    }
    getAll(formData: any) {
        return this.http.post(AppComponent.BaseUrl+'/umbraco/api/CandidateApi/Submit', formData);
    }

 
}
