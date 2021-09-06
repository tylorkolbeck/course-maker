import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/Course/course.service';
import { ActivatedRoute } from '@angular/router';
import { SectionsService } from '../../../core/services/Course/sections.service';

@Component({
  selector: 'app-note-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss'],
})
export class CourseEditorComponent implements OnInit {
  constructor(
    private courseService: CourseService,
    private sectionsService: SectionsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.params['id'];
    this.courseService.fetchCourse(courseId);
    this.sectionsService.getSections(courseId);
  }
}
