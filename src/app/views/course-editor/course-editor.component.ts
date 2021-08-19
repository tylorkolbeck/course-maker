import { Component, OnInit } from '@angular/core';
import { Lesson } from '../../../core/Models/Course.model';
import { CourseService } from '../../../core/services/Course/course.service';
import { EMPTY, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss'],
})
export class CourseEditorComponent implements OnInit {
  lesson: Lesson | null = null;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute
  ) {
    // this.lesson = courseService.lessonBeingEdited;

    courseService.lessonBeingEdited.subscribe((lesson: Lesson) => {
      this.lesson = lesson;
    });
    console.log(this.lesson);
  }

  ngOnInit(): void {
    const courseId = this.route.snapshot.params['id'];
    this.courseService.fetchCourse(courseId);
  }
}
