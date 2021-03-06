import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonListrComponent } from './lesson-listr.component';

describe('LessonListrComponent', () => {
  let component: LessonListrComponent;
  let fixture: ComponentFixture<LessonListrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonListrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonListrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
