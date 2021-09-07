import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lesson, Section } from '../../Models/Course.model';
import { LessonDataService } from '../apiServices/lesson/lesson-data.service';
import { SectionDataService } from '../apiServices/section/section-data.service';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  constructor(
    private sectionDataService: SectionDataService,
    private lessonDataService: LessonDataService,
    private courseService: CourseService
  ) {}

  sections$ = new Subject<Section[]>();
  private courseId: string | null = null;
  private sections: Section[] = [];

  getSections(courseId: string) {
    this.courseId = courseId;

    this.sectionDataService
      .fetchSections(this.courseId)
      .subscribe((sections: Section[]) => {
        console.log('SECTIONS AFTER CHANGE: ', sections);
        this.sections = sections;
        this.sections$.next(this.sections);
        if (this.sections[0] && this.sections[0].lessons[0]) {
          this.courseService.lessonBeingEdited$.next(
            this.sections[0].lessons[0]
          );
        }
      });
  }

  setSections(sections: Section[]) {
    this.sections = sections;
    this.sections$.next(this.sections.slice());
  }

  addSection() {
    if (this.courseId) {
      return this.sectionDataService.doAddSection(this.courseId).pipe(
        map((res) => {
          this.sections.push(res.content.section);
          this.sections$.next(this.sections.slice());
          return res.content.section.id;
        })
      );
      // .subscribe((res) => {
      //   this.sections.push(res.content.section);
      //   this.sections$.next(this.sections.slice());
      //   console.log('SECTION', res.content.section.id);
      //   return res.content.section.id;
      // });
    } else {
      return EMPTY;
    }
  }

  deleteSection(sectionId: string) {
    return this.sectionDataService.doDeleteSection(sectionId).pipe(
      map(() => {
        this.sections = this.sections.filter(
          (section) => section.id !== sectionId
        );
        this.sections$.next(this.sections.slice());
      })
    );
  }

  deleteLesson(lesson: Lesson) {
    this.lessonDataService
      .doDeleteLesson(lesson.id)
      .subscribe((lessonId: string) => {
        this.sections = this.sections.map((section: Section) => {
          if (section.id === lesson.section_id) {
            section.lessons = section.lessons.filter(
              (l: Lesson) => l.id !== lesson.id
            );
            return section;
          }

          return section;
        });

        this.sections$.next(this.sections.slice());
        this.courseService.lessonBeingEdited$.next();
      });
  }

  updateSection() {}
}
