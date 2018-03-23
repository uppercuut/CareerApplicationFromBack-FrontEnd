import { Http } from "@angular/http";
import { Injectable, Inject } from "@angular/core";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppComponent } from "../app/app.component";

@Injectable()
export class AvailableJobsService {
   
    constructor(private http: Http) {
    }
    getAll() {
        return this.http.get(AppComponent.BaseUrl+'/umbraco/api/JobApi/GetAllJobs');
    }

}