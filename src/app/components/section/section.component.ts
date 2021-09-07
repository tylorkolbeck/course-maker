import { Component, Input, OnInit } from '@angular/core';

import { Lesson, Section } from '../../../core/Models/Course.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CourseService } from '../../../core/services/Course/course.service';
import { environment } from '../../../environments/environment';
import { SectionsService } from '../../../core/services/Course/sections.service';
import { LessonDataService } from '../../../core/services/apiServices/lesson/lesson-data.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  @Input() section: Section | null = null;
  @Input() addingLessons!: boolean;

  @Input() sectionId: string = '';
  @Input() sectionNumber: string = '';
  @Input() sectionTitle: string = '';
  @Input() collapsed: boolean = false;
  @Input() lessons: Lesson[] = [];

  lessonBeingEditedId: string = '';
  modalOpen: boolean = false;
  sectionApiUrl: string = environment.sectionApiUrl;
  deleteLoading: boolean = false;
  deleteError: string | null = null;
  isExpanded: boolean = false;

  constructor(
    private courseService: CourseService,
    private sectionsService: SectionsService,
    private lessonDataService: LessonDataService
  ) {}

  ngOnInit(): void {
    this.isExpanded = !this.collapsed;
  }

  onEditLesson(lesson: Lesson) {
    this.courseService.setLessonBeingEdited(lesson);
  }

  onToggleModal() {
    this.modalOpen = !this.modalOpen;
    this.deleteError = null;
  }

  onDeleteSection() {
    this.deleteLoading = true;
    this.sectionsService.deleteSection(this.sectionId).subscribe(
      () => {
        this.deleteLoading = false;
      },
      () => {
        this.deleteError =
          'There was a problem deleting the section, refresh and try again';
        this.deleteLoading = false;
      }
    );
  }

  onAddLesson(lessonPosition: number) {
    console.log(lessonPosition);

    this.lessonDataService.doAddLesson(this.sectionId).subscribe(
      (lesson: Lesson) => {
        this.lessons.splice(lessonPosition, 0, lesson);
        this.isExpanded = true;
      },
      (error) => {}
    );
  }

  onToggleSectionAccorian() {
    this.sectionsService.updateSection(this.sectionId, {
      collapsed: this.isExpanded,
    });
    this.isExpanded = !this.isExpanded;
  }

  onTogglePublic() {
    this.sectionsService.updateSection(this.sectionId, {
      public: !this.section?.public,
    });

    if (this.section) {
      this.section.public = !this.section?.public;
    }
  }
}
