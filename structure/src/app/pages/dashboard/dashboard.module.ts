import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {RouterModule} from '@angular/router';

const DASHBOARD_ROUTE = [
  { path: '', component: DashboardComponent },
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(DASHBOARD_ROUTE)
  ]
})
export class DashboardModule { }
