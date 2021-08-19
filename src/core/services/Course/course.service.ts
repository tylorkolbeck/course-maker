import { Injectable } from '@angular/core';

import { Course, Lesson, Section } from '../../Models/Course.model';
import { Subject, ReplaySubject } from 'rxjs';
import { environment } from '../../../environments/environment';
// @ts-ignore: Unreachable code error
import cloneDeep from 'lodash.clonedeep';

// ** Dummy Data **
import { HttpClient } from '@angular/common/http';

// ** Dummy Data **

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courseApiUrl: string = environment.courseApiUrl;

  // Set up the observable
  public courseChanged: Subject<Course> = new Subject<Course>();
  public lessonBeingEdited: Subject<Lesson> = new ReplaySubject<Lesson>();

  private _course: any;

  constructor(private http: HttpClient) {}

  set course(course: Course) {
    this._course = course;
  }

  get course() {
    if (this._course.sections) {
      this._course.sections.sort((a: Section, b: Section) => {
        return a.order - b.order;
      });
    }
    return this._course;
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
    this.doAddSection({
      course_id: this.course.id,
    }).subscribe((res: any) => {
      const newSection = res.content.section;
      const newCourse = cloneDeep(this.course);

      newCourse.sections.push(newSection);

      this.courseChanged.next(newCourse);
      this.course = newCourse;

      return newSection.id;
    });
  }

  getSectionLessons(id: string) {
    let courseClone = cloneDeep(this.course);

    let sectionToGet = courseClone.sections.find(
      (section: Section) => section.id === id
    );
    let lessonsToGet;

    if (sectionToGet) {
      lessonsToGet = sectionToGet.lessons;
      if (lessonsToGet) {
        return lessonsToGet.sort((a: Lesson, b: Lesson) => a.order - b.order);
      }
    }
  }

  // Reorder Functions
  updateLessonsOrderInSection(id: string, lessons: Lesson[]) {
    const courseClone = cloneDeep(this.course);
    interface lessonOrderUpdatePayload {
      courseId: string;
      sectionId: string;
      lessons: { id: string; order: number }[];
    }

    let lessonsReorderPayload: lessonOrderUpdatePayload = {
      courseId: this.course.id,
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

    console.log('PAYLOAD TO UPDATE LESSONS ORDER', lessonsReorderPayload);
  }

  updateSectionsOrder(sections: Section[]) {
    interface courseOrderUpdatePayload {
      courseId: string;
      sections: { id: string; order: number }[];
    }

    let sectionsReorderPayload: courseOrderUpdatePayload = {
      courseId: this.course.id,
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

    console.log('PAYLOAD TO UPDATE SECTIONS ORDER', sectionsReorderPayload);
  }

  fetchCourse(courseId: string) {
    this.http.get(`${this.courseApiUrl}/${courseId}`).subscribe((res: any) => {
      this.course = res.content.course;
      this.courseChanged.next(this.course);
    });
  }

  fetchCourses() {
    return this.http.get(this.courseApiUrl);
  }

  doAddSection(reqBody: { course_id: string }) {
    return this.http.post(environment.privateApiUrl + '/sections', reqBody);
  }
}
