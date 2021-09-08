import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SectionDataService {
  constructor(private http: HttpClient) {}

  doAddSection(courseId: string) {
    return this.http.post<any>(environment.privateApiUrl + '/sections', {
      course_id: courseId,
    });
  }

  fetchSections(courseId: string) {
    return this.http
      .get<any>(`${environment.apiEndpoint}/sections/${courseId}`)
      .pipe(
        map((res) => {
          return res.content.sections;
        })
      );
  }

  doDeleteSection(sectionId: string) {
    return this.http
      .delete(`${environment.apiEndpoint}/sections/${sectionId}`)
      .pipe(map((res) => res));
  }

  doSectionReorder(payload: any) {
    return this.http.post<any>(
      `${environment.apiEndpoint}/sections/reorder/${payload.courseId}`,
      payload
    );
  }

  doSectionUpdate(sectionId: string, payload: any) {
    return this.http.post<any>(
      `${environment.apiEndpoint}/sections/${sectionId}`,
      payload
    );
  }

  doLessonUpdate(lessonId: string, payload: any) {
    console.log('>!>!>!', payload);
    return this.http.post<any>(
      `${environment.apiEndpoint}/lessons/lessonBody/${lessonId}`,
      payload
    );
  }
}
