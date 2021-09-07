import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Lesson } from '../../../Models/Course.model';

@Injectable({
  providedIn: 'root',
})
export class LessonDataService {
  constructor(private http: HttpClient) {}

  doAddLesson(sectionId: string): Observable<Lesson> {
    return this.http
      .post(`${environment.apiEndpoint}/lessons/add`, {
        sectionId,
      })
      .pipe(
        map((res: any) => {
          return res.content.lesson;
        })
      );
  }

  doDeleteLesson(lessonId: string) {
    return this.http
      .delete(`${environment.apiEndpoint}/lessons/${lessonId}`)
      .pipe(map((res) => lessonId));
  }
}
