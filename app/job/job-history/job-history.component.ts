import {Component, OnInit, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import {JobService} from '../shared/job.service';
import {Job} from '../shared/job';
import {Pagination} from '../../shared/pagination';

import {ComponentServiceStatus} from '../../shared/component-service-status';

import {ProgressBubbleComponent} from '../../common/progress-bubble/progress-bubble.component';
import {WidgetHeaderComponent} from '../../common/widget-header/widget-header.component';
import {WidgetBodyComponent} from '../../common/widget-body/widget-body.component';

export type AccessMode = "DEFAULT" | "ADMIN";
export type ComponentMode = "WIDGET" | "FULL";

@Component({
    selector: 'job-history',
    templateUrl: 'app/job/job-history/job-history.component.html',
    directives: [ProgressBubbleComponent, WidgetHeaderComponent, WidgetBodyComponent],
    providers: [JobService],
    styleUrls: ['app/job/job-history/job-history.component.css']
})
export class JobHistoryComponent implements OnInit {
    @Input()
    set cmode(componentMode: ComponentMode) {
        this.componentMode = componentMode || "WIDGET";
    }

    jobs: Array<Job>;
    status: ComponentServiceStatus = "IN_PROGRESS";
    accessMode: AccessMode = "DEFAULT";
    componentMode: ComponentMode = "WIDGET";
    statusMessage: string;
    pagination: Pagination;
    paginationArray: Object[];

    constructor(private jobService: JobService, private router: Router) {
    }

    ngOnInit() {
        this.getJobs();
    }


    goToTrackingPage(jobId: string){
        this.router.navigateByUrl("/track/" + jobId);
    }

    getJobs() {
        this.jobs = new Array<Job>();
        this.jobService.getHistory()
            .subscribe((pagedJob) => {
                this.manageHistory(pagedJob);
            }, (error) => {
                this.manageError(error);
            });
    }



    getJobsWithPageNumber(page: number){
        this.status = "IN_PROGRESS";
        this.jobService.getHistoryWithPageNumber(page)
            .subscribe((pagedJob) => {
                this.manageHistory(pagedJob)
            },(error) => {
                this.manageError(error);
            })
    }


    loadJobWithUrl(url: string){
        this.status = "IN_PROGRESS";
        this.jobService.getJobs(url)
            .subscribe((pagedJob)=> {
                this.manageHistory(pagedJob)
            }, (error) => {
                this.manageError(error);
            })
    }

    private manageHistory(pagedJob){
        this.status = "SUCCESSFUL";
        this.jobs = pagedJob.data;
        this.pagination = pagedJob.pagination;

        // FIXME: This is an ugly code I confess
        this.paginationArray = new Array();
        for (var i = 0; i < pagedJob.pagination.TotalPages; i++) {
            let page = { isSelected: "", pageNo: i }
            if (pagedJob.pagination.Page == i) {
                page.isSelected = "selected"
            }
            this.paginationArray.push(page);
        }

        if (!this.jobs.length) {
            this.status = "EMPTY";
            this.statusMessage = "It looks lonely here. Why don't you put an order?";
        }
    }
    private manageError(error){
        this.statusMessage = error.Message || "Failed to fetch data from server";
        this.status = "FAILED";
    }

    setJobStatusLabelClass(state: string) {
        switch (state) {
            case "COMPLETED":
                return "label green";
            case "ENQUEUED":
                return "label orange";
            case "IN_PROGRESS":
                return "label blue";
            case "CANCELLED":
                return "label red";
            default:
                break;
        }
    }

    setPaymentStatusLabelClass(state: string) {
        switch (state) {
            case "Pending":
                return "label label-primary";
            case "Authorized":
                return "label label-info";
            case "Paid":
                return "label label-success";
            case "PartiallyRefunded":
                return "label label-warning";
            case "Refunded":
                return "label label-danger";
            case "Voided":
                return "label label-default";
            default:
                break;
        }
    }
}
