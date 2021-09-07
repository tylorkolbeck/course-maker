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
  public: boolean;

  constructor(title: string, sections: Section[]) {
    this.id = uuidv4();
    this.title = title;
    this.sections = sections;
    this.createdAt = new Date();
    this.public = false;
  }
}

export class Section {
  id: string;
  title: string;
  lessons: Lesson[] | [] = [];
  order: number;
  collapsed: boolean;
  public: boolean = false;

  constructor(title: string, lessons: Lesson[], order: number) {
    this.id = uuidv4();
    this.title = title;
    this.lessons = lessons;
    this.order = order;
    this.collapsed = false;
  }
}

export class Lesson {
  id: string = '';
  title: string = '';
  body: string = '';
  order: number;
  updatedAt?: Date;
  section_id: string = '';

  constructor(
    title: string,
    order: number,
    body: string = 'Add you lesson content here...',
    section_id: ''
  ) {
    this.id = uuidv4();
    this.title = title;
    this.order = order;
    this.body = body;
    this.section_id = section_id;
  }
}
