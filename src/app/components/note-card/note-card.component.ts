import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit {
  @Input() editing: boolean = false;

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
