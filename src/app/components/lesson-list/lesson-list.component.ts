import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from 'src/core/services/Course/course.service';
import { SidebarService } from 'src/core/services/Sidebar/sidebar.service';
import { Course, Lesson, Section } from '../../../core/Models/Course.model';

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
  sections: Section[];

  constructor(
    private sideNavService: SidebarService,
    private courseService: CourseService
  ) {
    this.showSideNav$ = this.sideNavService.getShowNav();
    this.sections = this.courseService.getSections();
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    this.courseService.updateSectionsOrder(this.sections);
  }
}
