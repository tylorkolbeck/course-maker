import { Injectable } from '@angular/core';

import { Course, Lesson, Section } from '../../Models/Course.model';
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
// @ts-ignore: Unreachable code error
import cloneDeep from 'lodash.clonedeep';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  get(): Observable<any> {
    return this.fetchCourse('1');
  }

  courseApiUrl: string = environment.courseApiUrl;
  sectionApiUrl: string = environment.sectionApiUrl;
  lessonApiUrl: string = environment.lessonApiUrl;

  // Course Data
  courseId: string = '';
  title: string = '';
  isPublic: boolean = false;
  sections: Section[] | [] = [];

  public lessonBeingEdited$ = new Subject<Lesson>();
  public sections$ = new Subject<Section[] | null>();

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

  setLessonBeingEdited(lesson: Lesson) {
    // let lesson = section?.lessons?.find(
    //   (lesson: Lesson) => lesson.id === lessonId
    // );
    this.lessonBeingEdited$.next(lesson);
  }

  // getSectionLessons(id: string) {
  //   let courseClone = cloneDeep(this.course);

  //   let sectionToGet = courseClone.sections.find(
  //     (section: Section) => section.id === id
  //   );
  //   let lessonsToGet;

  //   if (sectionToGet) {
  //     lessonsToGet = sectionToGet.lessons;
  //     if (lessonsToGet) {
  //       return lessonsToGet.sort((a: Lesson, b: Lesson) => a.order - b.order);
  //     }
  //   }
  // }

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
    return this.http.get<Course>(`${this.courseApiUrl}/${courseId}`);

    // .subscribe((res: any) => {
    //   console.log(res.content);
    //   this.course = res.content.course;

    //   this.courseId = res.content.course.id;
    //   this.title = res.content.course.title;
    //   this.isPublic = res.content.course.public;
    //   this.sections = res.content.course.sections;

    //   this.sections$.next(res.content.course.sections.slice());
    // });
  }

  fetchCourses() {
    return this.http
      .get(this.courseApiUrl)
      .pipe(map((res: any) => res.content.courses));
  }

  // removeSection(sectionId: string) {
  //   let courseCopy = cloneDeep(this.course);
  //   courseCopy.sections = courseCopy.sections.filter(
  //     (section: Section) => section.id !== sectionId
  //   );
  //   this.course = courseCopy;
  // }

  // doDeleteSection(sectionId: string): Observable<string> {
  //   console.log('running delete');
  //   return this.http.delete(this.sectionApiUrl + '/' + sectionId).pipe(
  //     map((res: any) => {
  //       this.removeSection(sectionId);
  //       return res.content.sectionId;
  //     })
  //   );
  // }

  doAddLesson(sectionId: string) {
    return this.http
      .post(this.lessonApiUrl + '/add', {
        sectionId,
      })
      .pipe(
        map((res: any) => {
          const lesson: Lesson = res.content.lesson;
          const newCourse: Course = cloneDeep(this.course);

          const newSections: any[] = newCourse.sections.map(
            (section: Section) => {
              if (section.id === sectionId && lesson) {
                let lessons: Lesson[] = [...section.lessons];
                lessons.push(lesson);
                section.lessons = lessons;
                return section;
              } else {
                return section;
              }
            }
          );

          newCourse.sections = newSections;

          // this.course = newCourse;
          this.sections = newCourse.sections;
          this.sections$.next(newCourse.sections);

          return res.content.lesson;
        })
      );
  }
}
