import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from 'src/core/Models/Course.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CourseService } from 'src/core/services/Course/course.service';

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

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.lessons = this.courseService.getSectionLessons(this.sectionId);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lessons, event.previousIndex, event.currentIndex);
    console.log(this.lessons);
    this.courseService.updateLessonsOrderInSection(
      this.sectionId,
      this.lessons
    );
  }
}
