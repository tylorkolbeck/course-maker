import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lesson-card',
  templateUrl: './lesson-card.component.html',
  styleUrls: ['./lesson-card.component.scss'],
})
export class LessonCardComponent implements OnInit {
  @Input() editing: boolean = false;
  @Input() title: string = 'jh';

  constructor() {}

  ngOnInit(): void {}

  getActiveClass() {
    if (this.editing) {
      return 'note-card-active';
    } else {
      return {};
    }
  }
}
