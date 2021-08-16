import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../../core/Models/Course.model';
import { CourseService } from '../../../core/services/Course/course.service';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-note-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss'],
})
export class CourseEditorComponent implements OnInit {
  lesson: Lesson | null = null;

  constructor(private courseService: CourseService) {
    // this.lesson = courseService.lessonBeingEdited;

    courseService.lessonBeingEdited.subscribe((lesson: Lesson) => {
      console.log('CHAGNED TO', lesson);
      this.lesson = lesson;
    });
    console.log(this.lesson);
  }

  ngOnInit(): void {}
}
