import { Component, Input, OnInit } from '@angular/core';

import { Lesson, Section } from '../../../core/Models/Course.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CourseService } from '../../../core/services/Course/course.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SectionsService } from '../../../core/services/Course/sections.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  @Input() section: Section | null = null;

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
    private http: HttpClient,
    private sectionsService: SectionsService
  ) {}

  ngOnInit(): void {
    // this.lessons = this.courseService.getSectionLessons(this.sectionId);
    // this.courseService.lessonBeingEdited.subscribe((lesson) => {
    //   this.lessonBeingEditedId = lesson.id;
    // });
    this.isExpanded = !this.collapsed;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lessons, event.previousIndex, event.currentIndex);
    this.courseService.updateLessonsOrderInSection(
      this.sectionId,
      this.lessons
    );
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

  onAddLesson() {
    this.courseService.doAddLesson(this.sectionId).subscribe(
      (res) => {
        this.onToggleModal();
        console.log(res);
      },
      (error) => {}
    );
  }

  onToggleSectionAccorian() {
    this.isExpanded = !this.isExpanded;
  }
}
