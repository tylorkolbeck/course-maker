import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from '../../../core/services/Course/course.service';
import { SidebarService } from '../../../core/services/Sidebar/sidebar.service';
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

    this.courseService.courseChanged.subscribe((course) => {
      this.sections = course.sections;
    });
  }

  onSidebarToggle() {
    this.sideNavService.toggleNavState();
  }

  onAddSection() {
    const newSectionId = this.courseService.addSection();
    tryScrollToNewElement(10, 'section-' + newSectionId);

    // This function makes sure that the element is in the dom before trying to scroll to it
    // if the element does not exsist after the given amount of framerate trys then just give up,
    // its not the important
    function tryScrollToNewElement(trys: number, elId: string) {
      let sectionEl = document.getElementById(elId);

      trys--;
      if (!sectionEl && trys > 0) {
        window.requestAnimationFrame(() => tryScrollToNewElement(trys, elId));
      } else if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
