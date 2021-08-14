import { Injectable } from '@angular/core';
import { Course, Lesson, Section } from 'src/core/Models/Course.model.js';
import { Observable, Subject } from 'rxjs';
import deepClone from '../../../app/_helpers/deepClone.js';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { fromJS } from 'immutable';

// ** Dummy Data **
import course from '../../../app/_helpers/dummyData/course';
// ** Dummy Data **

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  // Set up the observable
  courseChanged = new Subject<Course>();

  private course: any;

  constructor() {
    // Assign dummy data
    this.fetchCourseData();
  }

  fetchCourseData() {
    this.course = deepClone(course);
  }

  getCourse() {
    return deepClone(this.course);
  }

  getSectionLessons(id: string) {
    return this.course.sections
      .find((section: Section) => section.id === id)
      .lessons.slice();
  }

  updateCourse() {
    this.course.sections = this.course.sections.slice(0, 1);
    this.courseChanged.next(this.course);
  }

  updateLessonsOrderInSection(id: string, lessons: Lesson[]) {
    interface lessonOrderUpdatePayload {
      sectionId: string;
      lessons: { id: string; order: number }[];
    }

    let lessonsReorderPayload: lessonOrderUpdatePayload = {
      sectionId: '',
      lessons: [],
    };

    this.course = course.sections.map((section: Section, index: number) => {
      if (section.id === id) {
        lessonsReorderPayload.sectionId = id;
        section.lessons = lessons.map((lesson: Lesson, index: number) => {
          lesson.order = index;
          lessonsReorderPayload.lessons.push({
            id: lesson.id,
            order: index,
          });

          return { ...lesson };
        });
      }

      return {
        ...section,
      };
    });

    console.log('PAYLOAD TO UPDATE THROUGH API', lessonsReorderPayload);
  }
}
