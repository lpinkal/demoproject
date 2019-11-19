import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import {layoutRoutes} from './layout.routes';
import {SharedModule} from '../shared/shared.module';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';

@NgModule({
  declarations: [LayoutComponent, LeftSidebarComponent, TopNavbarComponent],
  imports: [
    CommonModule,
    layoutRoutes,
    SharedModule
  ]
})
export class LayoutModule { }
