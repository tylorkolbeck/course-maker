import { Injectable } from '@angular/core';
// @ts-ignore: Unreachable code error
import { Course, Lesson, Section } from 'src/core/Models/Course.model.js';
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
  courseChanged = new Subject<Course>();
  lessonBeingEdited: Subject<Lesson> = new ReplaySubject<Lesson>();

  private course: any;

  constructor() {
    // Assign dummy data
    this.fetchCourseData();

    // for (let i = 0; i < this.course.sections.length; i++) {
    //   if (this.course.sections[i].lessons.length) {
    //     this.lessonBeingEdited = this.course.sections[i].lessons[0];
    //     return;
    //   }
    // }
  }

  fetchCourseData() {
    this.course = cloneDeep(course);
  }

  setLessonBeingEdited(sectionId: string, lessonId: string) {
    let section = this.course.sections.find(
      (section: Section) => section.id === sectionId
    );
    let lesson = section.lessons.find(
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

  getSectionLessons(id: string) {
    return cloneDeep(
      this.course.sections.find((section: Section) => section.id === id).lessons
    ).sort((a: Lesson, b: Lesson) => a.order - b.order);
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

    this.course = sections.map((section: Section, index: number) => {
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
