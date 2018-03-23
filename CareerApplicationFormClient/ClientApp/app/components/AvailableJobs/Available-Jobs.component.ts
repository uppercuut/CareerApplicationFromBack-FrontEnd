import { Component, Output, Input, EventEmitter, ViewContainerRef, OnInit } from '@angular/core';
import { AvailableJobsService } from './Available-Jobs.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: 'DDLJobs',
    templateUrl: 'Available-Jobs.component.html'
})
export class AvailableJobs implements OnInit {
    ngOnInit(): void {
        this.showInfo('Conectting to server....');     
    }

    @Output() select: EventEmitter<any>;


    @Output() onSelect(val:any) {

        this.select.emit(val)
    }

    jobs: any;   
    constructor(JobService: AvailableJobsService, private toastr: ToastsManager, vcr: ViewContainerRef) {
        this.select = new EventEmitter();
        JobService.getAll().subscribe(respone => {
            this.jobs = respone.json();
            this.showSuccess("Servers are online");
        }, error => {
            this.showError('Servers are not responding');
            })
    }
    showSuccess(Body: string) {
        this.toastr.success(Body, 'Success!');
    }

    showError(Body: string) {
        this.toastr.error(Body, 'Oops!');
    }



    showInfo(Body: string) {
        this.toastr.info(Body);
    }

   
   
   


}