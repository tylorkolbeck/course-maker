import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from '../../../core/Models/Course.model';
import { CourseService } from '../../../core/services/Course/course.service';

@Component({
  selector: 'app-lesson-editor',
  templateUrl: './lesson-editor.component.html',
  styleUrls: ['./lesson-editor.component.scss'],
})
export class LessonEditorComponent implements OnInit {
  // @Input() lesson: Lesson | null = null;
  lesson: Lesson | null = null;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.lessonBeingEdited$.subscribe(
      (lesson) => (this.lesson = lesson)
    );
  }
}
