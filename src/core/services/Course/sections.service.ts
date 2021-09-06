import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Section } from '../../Models/Course.model';
import { SectionDataService } from '../apiServices/section/section-data.service';

@Injectable({
  providedIn: 'root',
})
export class SectionsService {
  constructor(private sectionDataService: SectionDataService) {}

  sections$ = new Subject<Section[]>();
  private courseId: string | null = null;
  private sections: Section[] = [];

  getSections(courseId: string) {
    this.courseId = courseId;

    this.sectionDataService
      .fetchSections(this.courseId)
      .subscribe((sections: Section[]) => {
        console.log(sections);
        this.sections = sections;
        this.sections$.next(this.sections);
      });
  }

  setSections(sections: Section[]) {
    this.sections = sections;
    this.sections$.next(this.sections.slice());
  }

  addSection() {
    if (this.courseId) {
      this.sectionDataService.doAddSection(this.courseId).subscribe((res) => {
        this.sections.push(res.content.section);
        this.sections$.next(this.sections.slice());
      });
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

  updateSection() {}
}
