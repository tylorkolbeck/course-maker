import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// AuthGuard
import { AuthGuard } from '../core/guards/auth.guard';

// Components
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { CourseEditorComponent } from './views/course-editor/course-editor.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: CourseEditorComponent, canActivate: [AuthGuard] },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
