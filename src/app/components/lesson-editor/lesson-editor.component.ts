import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from '../../../core/Models/Course.model';
import { LessonDataService } from '../../../core/services/apiServices/lesson/lesson-data.service';
import { CourseService } from '../../../core/services/Course/course.service';
import { SectionsService } from '../../../core/services/Course/sections.service';

@Component({
  selector: 'app-lesson-editor',
  templateUrl: './lesson-editor.component.html',
  styleUrls: ['./lesson-editor.component.scss'],
})
export class LessonEditorComponent implements OnInit {
  lesson!: Lesson;

  constructor(
    private courseService: CourseService,
    private sectionsService: SectionsService
  ) {}

  ngOnInit(): void {
    this.courseService.lessonBeingEdited$.subscribe(
      (lesson) => (this.lesson = lesson)
    );
  }

  onDeleteLesson() {
    this.sectionsService.deleteLesson(this.lesson);
  }
}
