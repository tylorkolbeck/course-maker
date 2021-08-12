import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss'],
})
export class SectionCardComponent implements OnInit {
  @Input() sectionNumber: string = '';
  @Input() sectionTitle: string = '';

  constructor() {}

  ngOnInit(): void {}
}
