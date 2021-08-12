import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/core/services/Sidebar/sidebar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  constructor(private navbarService: SidebarService) {}

  ngOnInit(): void {}

  toggleSideNav() {
    this.navbarService.toggleNavState();
  }
}
