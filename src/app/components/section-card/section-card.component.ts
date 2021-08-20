import { Component, Input, OnInit } from '@angular/core';

import { Lesson } from '../../../core/Models/Course.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CourseService } from '../../../core/services/Course/course.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss'],
})
export class SectionCardComponent implements OnInit {
  @Input() sectionId: string = '';
  @Input() sectionNumber: string = '';
  @Input() sectionTitle: string = '';
  lessons: Lesson[] = [];
  lessonBeingEditedId: string = '';
  modalOpen: boolean = false;
  sectionApiUrl: string = environment.sectionApiUrl;
  deleteLoading: boolean = false;
  deleteError: string | null = null;

  constructor(private courseService: CourseService, private http: HttpClient) {}

  ngOnInit(): void {
    this.lessons = this.courseService.getSectionLessons(this.sectionId);
    this.courseService.lessonBeingEdited.subscribe((lesson) => {
      this.lessonBeingEditedId = lesson.id;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lessons, event.previousIndex, event.currentIndex);
    this.courseService.updateLessonsOrderInSection(
      this.sectionId,
      this.lessons
    );
  }

  onEditLesson(lessonId: string) {
    this.courseService.setLessonBeingEdited(this.sectionId, lessonId);
  }

  onToggleModal() {
    this.modalOpen = !this.modalOpen;
    this.deleteError = null;
  }

  onDeleteSection() {
    this.deleteLoading = true;
    this.courseService.doDeleteSection(this.sectionId).subscribe(
      (sectionId) => {
        if (sectionId) {
          this.deleteLoading = false;
          this.onToggleModal();
        }
      },
      (error) => {
        this.deleteError =
          'There was an issue deleting the section. Please refresh the page and try again';
        this.deleteLoading = false;
      }
    );
  }
}
