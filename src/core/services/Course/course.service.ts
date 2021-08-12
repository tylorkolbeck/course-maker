import { Injectable } from '@angular/core';
import { Course } from 'src/core/Models/Course.model.js';
import { Observable, Subject } from 'rxjs';

// ** Dummy Data **
import course_DUMMY_DATA from '../../../app/_helpers/dummyData/course.js';
// ** Dummy Data **

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  // Set up the observable
  courseChanged = new Subject<Course>();

  private course: Course | null;

  constructor() {
    // Assign dummy data
    this.course = course_DUMMY_DATA;
  }

  getCourse() {
    return this.course;
  }
}
