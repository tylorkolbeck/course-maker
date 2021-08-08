import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private navbarService: SidebarService) { }

  ngOnInit(): void {
  }

  toggleSideNav() {
    this.navbarService.toggleNavState()
  }

}
