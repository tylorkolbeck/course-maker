import { Injectable } from '@angular/core';

import { Course, Lesson, Section } from '../../Models/Course.model';
import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
// @ts-ignore: Unreachable code error
import cloneDeep from 'lodash.clonedeep';

// ** Dummy Data **
import course from '../../../app/_helpers/dummyData/course';

// ** Dummy Data **

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  // Set up the observable
  public courseChanged: Subject<Course> = new Subject<Course>();
  public lessonBeingEdited: Subject<Lesson> = new ReplaySubject<Lesson>();

  private _course: any;

  constructor() {
    // Assign dummy data
    this.fetchCourseData();
  }

  set course(course: Course) {
    this._course = course;
  }

  get course() {
    this._course.sections.sort((a: Section, b: Section) => {
      return a.order - b.order;
    });
    return this._course;
  }

  fetchCourseData() {
    this.course = cloneDeep(course);
  }

  setLessonBeingEdited(sectionId: string, lessonId: string) {
    let section = this.course.sections.find(
      (section: Section) => section.id === sectionId
    );
    let lesson = section?.lessons?.find(
      (lesson: Lesson) => lesson.id === lessonId
    );
    this.lessonBeingEdited.next(lesson);
  }

  getSections() {
    const sections = cloneDeep(this.course.sections);

    sections.sort((a: Section, b: Section) => {
      return a.order - b.order;
    });

    return sections;
  }

  addSection() {
    const newCourse = cloneDeep(this.course);

    const newLesson = new Lesson('New Lesson', 0);
    const newSection = new Section(
      'New Section',
      [newLesson],
      this.course.sections.length + 1
    );

    newCourse.sections.push(newSection);

    this.courseChanged.next(newCourse);
    this.course = newCourse;
    this.lessonBeingEdited.next(newLesson);

    return newSection.id;
  }

  getSectionLessons(id: string) {
    let courseClone = cloneDeep(this.course);

    let sectionToGet = courseClone.sections.find(
      (section: Section) => section.id === id
    );
    let lessonsToGet;

    if (sectionToGet) {
      lessonsToGet = sectionToGet.lessons;
      return lessonsToGet.sort((a: Lesson, b: Lesson) => a.order - b.order);
    }
  }

  // Reorder Functions
  updateLessonsOrderInSection(id: string, lessons: Lesson[]) {
    const courseClone = cloneDeep(this.course);
    interface lessonOrderUpdatePayload {
      sectionId: string;
      lessons: { id: string; order: number }[];
    }

    let lessonsReorderPayload: lessonOrderUpdatePayload = {
      sectionId: '',
      lessons: [],
    };

    this.course = courseClone.sections.map(
      (section: Section, index: number) => {
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
      }
    );
    this.course = course;

    console.log('PAYLOAD TO UPDATE LESSONS ORDER', lessonsReorderPayload);
  }

  updateSectionsOrder(sections: Section[]) {
    interface courseOrderUpdatePayload {
      courseId: string;
      sections: { id: string; order: number }[];
    }

    let sectionsReorderPayload: courseOrderUpdatePayload = {
      courseId: '',
      sections: [],
    };

    this.course.sections = sections.map((section: Section, index: number) => {
      section.order = index;
      sectionsReorderPayload.sections.push({
        id: section.id,
        order: index,
      });

      return { ...section };
    });

    this.course = course;

    console.log('PAYLOAD TO UPDATE SECTIONS ORDER', sectionsReorderPayload);
  }
}
