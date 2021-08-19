import { Component, OnInit } from '@angular/core';
import { Course } from '../../../core/Models/Course.model';
import { AuthService } from '../../../core/services/Auth/auth.service';
import { CourseService } from '../../../core/services/Course/course.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  courseApiUrl: string = environment.courseApiUrl;
  courses: Course[] = [];

  constructor(
    private authService: AuthService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseService.fetchCourses().subscribe((res: any) => {
      if (res?.content?.courses) {
        this.courses = res.content.courses;
      }
    });
  }

  onLogout() {
    this.authService.doLogout();
  }
}
