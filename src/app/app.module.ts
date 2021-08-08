import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainLayoutComponent,
    NoteListComponent,
    NoteCardComponent,
    NoteEditorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered'}, { 'list': 'bullet' }], [{ 'header': 1 }, { 'header': 2 }], ['link']],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }