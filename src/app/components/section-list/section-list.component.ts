import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { SidebarService } from '../../../core/services/Sidebar/sidebar.service';
import { Section } from '../../../core/Models/Course.model';
import { SectionsService } from '../../../core/services/Course/sections.service';
import { CourseService } from '../../../core/services/Course/course.service';

// Todo
// [ ] Setup a service to handle lesson state
// [ ] Use the service to handle reordering of lessons in drag and drop

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.scss'],
})
export class SectionListComponent implements OnInit {
  // Navigation setup
  showSideNav$: Observable<boolean>;
  sideNavWidth: number = 350;

  // Subscribe to sections data
  sections$!: Subscription;
  sections: Section[] = [];
  addingLesson: boolean = false;

  constructor(
    private sideNavService: SidebarService,
    private sectionsService: SectionsService
  ) {
    this.showSideNav$ = this.sideNavService.getShowNav();
  }

  ngOnInit(): void {
    this.sections$ = this.sectionsService.sections$.subscribe(
      (sections: Section[]) => {
        this.sections = sections;
      }
    );

    this.showSideNav$ = this.sideNavService.getShowNav();
  }

  onSidebarToggle() {
    this.sideNavService.toggleNavState();
  }

  onAddSection() {
    this.sectionsService.addSection().subscribe((sectionId: any) => {
      tryScrollToNewElement(10, 'section-' + sectionId);
    });

    // This function makes sure that the element is in the dom before trying to scroll to it
    // if the element does not exsist after the given amount of framerate trys then just give up,
    // its not the important
    function tryScrollToNewElement(trys: number, elId: string) {
      let sectionEl = document.getElementById(elId);
      console.log('>>>', sectionEl);

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
    console.log(event.previousIndex, event.currentIndex);
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
    this.sectionsService.updateSectionsOrder(this.sections);
  }

  onToggleAddingLessons() {
    this.addingLesson = !this.addingLesson;
  }
}
