import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';

const LAYOUT_ROUTES: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import("../pages/dashboard/dashboard.module").then(m=>m.DashboardModule)
      }
    ]
  }
];

export const layoutRoutes = RouterModule.forChild(LAYOUT_ROUTES);
