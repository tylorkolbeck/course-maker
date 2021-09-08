import { Component, Input, OnInit } from '@angular/core';
import { Lesson, Section } from '../../../core/Models/Course.model';
import { CourseService } from '../../../core/services/Course/course.service';
import { environment } from '../../../environments/environment';
import { SectionsService } from '../../../core/services/Course/sections.service';
import { LessonDataService } from '../../../core/services/apiServices/lesson/lesson-data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  sectionForm!: FormGroup;

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

    this.sectionForm = new FormGroup({
      title: new FormControl(this.section?.title, Validators.required),
      public: new FormControl(this.section?.public),
    });
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

  onSaveChanges() {
    this.onToggleModal();
  }

  onFormSubmit() {
    const formValues = this.sectionForm.value;
    if (this.section) {
      this.section.title = formValues.title;
      this.section.public = formValues.public;
    }
    this.sectionsService.updateSection(this.sectionId, this.sectionForm.value);
  }
}
