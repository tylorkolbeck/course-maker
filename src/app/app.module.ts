import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Interceptors
import { AuthInterceptor } from '../core/interceptors/authconfig.interceptor';
import { AuthErrorInterceptor } from '../core/interceptors/authError.interceptor';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { DragDropModule as CdkDragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { SectionListComponent } from './components/section-list/section-list.component';
import { QuillModule } from 'ngx-quill';
import { SectionComponent } from './components/section/section.component';

// Views
import { CourseEditorComponent } from './views/course-editor/course-editor.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';

// Initializer
import { appInitializer } from './_helpers/app.initializer';

// Services
import { AuthService } from '../core/services/Auth/auth.service';
import { ModalComponent } from './components/modal/modal.component';
import { LessonEditorComponent } from './components/lesson-editor/lesson-editor.component';
import { LessonListComponent } from './components/lesson-list/lesson-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainLayoutComponent,
    SectionListComponent,
    CourseEditorComponent,
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    SectionComponent,
    ModalComponent,
    LessonEditorComponent,
    LessonListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CdkDragDropModule,
    CdkAccordionModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: '' }, { align: 'center' }, { align: 'right' }],
          [{ header: 1 }, { header: 2 }],
          ['link'],
          ['image'],
        ],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      deps: [AuthService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
