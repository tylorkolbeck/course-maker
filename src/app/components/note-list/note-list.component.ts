import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  
  showSideNav$: Observable<boolean>;
  sideNavWidth: number = 300;

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
    navBarStyle.left = (this.showSideNav$ ? 0 : (this.sideNavWidth * -1)) + 'px';
    
    return navBarStyle;
  }
}
