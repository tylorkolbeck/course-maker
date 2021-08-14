import { Component, OnInit } from '@angular/core';
import { Course } from 'src/core/Models/Course.model';
import { CourseService } from 'src/core/services/Course/course.service';

@Component({
  selector: 'app-note-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.scss'],
})
export class CourseEditorComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
