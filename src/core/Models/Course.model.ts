import { v4 as uuidv4 } from 'uuid';

/**
 Course Structure
 {
    id: '1',
    title: 'Course Title',
    sections: [
      {
        id: '1',
        title: 'Section One',
        lessons: [
          {
            id: '1',
            title: 'Lesson Title',
            body: 'Lesson body'
          }
        ]
      }
    ]
    ...
  }
*/

export class Course {
  id: string;
  title: string;
  sections: Section[] | [];
  createdAt: Date;
  updatedAt?: Date;

  constructor(title: string, sections: Section[]) {
    this.id = uuidv4();
    this.title = title;
    this.sections = sections;
    this.createdAt = new Date();
  }
}

export class Section {
  id: string;
  title: string;
  lessons?: Lesson[] | [];
  order: number;

  constructor(title: string, lessons: Lesson[], order: number) {
    this.id = uuidv4();
    this.title = title;
    this.lessons = lessons;
    this.order = order;
  }
}

export class Lesson {
  id: string = '';
  title: string = '';
  body: string = '';
  order: number;

  constructor(
    title: string,
    order: number,
    body: string = 'Add you lesson content here...'
  ) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.body = body;
  }
}
