import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarService } from 'src/core/services/Sidebar/sidebar.service';
import { Lesson } from '../../../core/Models/Course.model';

// Todo
// [ ] Setup a service to handle lesson state
// [ ] Use the service to handle reordering of lessons in drag and drop

@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.scss'],
})
export class LessonListComponent implements OnInit {
  showSideNav$: Observable<boolean>;
  sideNavWidth: number = 300;
  sectionList = [
    {
      title: 'Course Introduction',
      lessons: [
        <Lesson>new Lesson('Course Intro', 0),
        <Lesson>new Lesson('Course Requirements', 1),
        <Lesson>new Lesson('Course Prerequisites', 2),
      ],
    },
    {
      title: 'Setting Up Environment',
      lessons: [
        <Lesson>new Lesson('Installing Angular', 0),
        <Lesson>new Lesson('Installing Node', 1),
        <Lesson>new Lesson('Installing Note(mac)', 2),
      ],
    },
    {
      title: 'Getting Started',
      lessons: [
        <Lesson>new Lesson('Bootstrapping your first app', 0),
        <Lesson>new Lesson('Running your app', 1),
        <Lesson>new Lesson('Deployment', 2),
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
