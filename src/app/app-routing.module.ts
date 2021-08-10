import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
    { path: '', component: NoteEditorComponent },
    { path: 'profile', component: ProfileComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }

    ] }
  ] },
  
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
