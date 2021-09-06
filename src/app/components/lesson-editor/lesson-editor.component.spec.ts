import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonEditorComponent } from './lesson-editor.component';

describe('LessonEditorComponent', () => {
  let component: LessonEditorComponent;
  let fixture: ComponentFixture<LessonEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
