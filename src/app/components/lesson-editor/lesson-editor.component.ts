import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  @Input() control: FormControl = new FormControl();
  htmlText = '';
  lesson!: Lesson;
  lessonBody: any | null;

  constructor(
    private courseService: CourseService,
    private sectionsService: SectionsService,
    private lessonDataService: LessonDataService
  ) {}

  ngOnInit(): void {
    this.courseService.lessonBeingEdited$.subscribe(
      (lesson) => (this.lesson = lesson)
    );

    this.courseService.lessonBeingEdited$.subscribe((lesson) => {
      this.lessonDataService.fetchLesson(lesson.id).subscribe((res: any) => {
        this.lessonBody = res.content.lessonBody;
        this.htmlText = res.content.lessonBody.body;
      });
      this.htmlText = lesson.body;
    });

    this.control = this.control ?? new FormControl();
  }

  onDeleteLesson() {
    this.sectionsService.deleteLesson(this.lesson);
  }

  onContentChanged(event: any) {
    // console.log(this.htmlText);
  }

  onSubmit() {
    this.sectionsService.updateLessonBody(this.lesson.id, {
      body: this.htmlText,
    });
  }
}
