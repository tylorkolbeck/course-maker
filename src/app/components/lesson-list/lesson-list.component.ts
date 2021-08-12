import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarService } from 'src/app/services/sidebar.service';
import Lesson from '../../shared/Models/Lesson.nodel';

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss'],
})
export class LessonListComponent implements OnInit {
  showSideNav$: Observable<boolean>;
  sideNavWidth: number = 300;
  noteList = [
    {
      title: 'Section One',
      lessons: [
        new Lesson('Lesson 1'),
        new Lesson('Lesson 2'),
        new Lesson('Lesson 3'),
      ],
    },
    {
      title: 'Section Two',
      lessons: [
        new Lesson('Lesson 1'),
        new Lesson('Lesson 2'),
        new Lesson('Lesson 3'),
      ],
    },
    {
      title: 'Section Three',
      lessons: [
        new Lesson('Lesson 1'),
        new Lesson('Lesson 2'),
        new Lesson('Lesson 3'),
      ],
    },
  ];

  constructor(private sideNavService: SidebarService) {
    this.showSideNav$ = this.sideNavService.getShowNav();
  }

  ngOnInit(): void {
    this.showSideNav$ = this.sideNavService.getShowNav();
  }

  onSidebarToggle() {
    this.sideNavService.toggleNavState();
  }

  getSideNavBarStyle(showNav: boolean) {
    let navBarStyle: any = {};
    navBarStyle.transition = 'left ' + 0.25 + 's, visibility ' + 0.25 + 's';
    navBarStyle.width = this.sideNavWidth + 'px';
    navBarStyle.left = (this.showSideNav$ ? 0 : this.sideNavWidth * -1) + 'px';

    return navBarStyle;
  }
}
