import { Course } from '../../../core/Models/Course.model';

const course: Course = {
  id: '1',
  title: 'Course Title',
  sections: [
    {
      id: '1',
      title: 'Section One',
      order: 1,
      lessons: [
        {
          id: '1',
          order: 1,
          title: 'Section One - Lesson One',
          body: '<p>Section One - Lesson One</p>',
        },
        {
          id: '2',
          order: 2,
          title: 'Section One - Lesson Two',
          body: '<p>Section One - Lesson Two</p>',
        },
        {
          id: '3',
          order: 3,
          title: 'Section One - Lesson Three',
          body: '<p>Section One - Lesson Three</p>',
        },
      ],
    },
    {
      id: '2',
      title: 'Section Two',
      order: 2,
      lessons: [
        {
          id: '1',
          order: 1,
          title: 'Section Two - Lesson One',
          body: '<p>Section Two - Lesson One</p>',
        },
        {
          id: '2',
          order: 2,
          title: 'Section Two - Lesson Two',
          body: '<p>Section Two - Lesson Two</p>',
        },
        {
          id: '3',
          order: 3,
          title: 'Section Two - Lesson Three',
          body: '<p>Section Two - Lesson Three</p>',
        },
      ],
    },
    {
      id: '3',
      title: 'Section Three',
      order: 3,
      lessons: [
        {
          id: '1',
          order: 1,
          title: 'Section Three - Lesson One',
          body: '<p>Section Three - Lesson One</p>',
        },
        {
          id: '2',
          order: 2,
          title: 'Section Three - Lesson Two',
          body: '<p>Section Three - Lesson Two</p>',
        },
        {
          id: '3',
          order: 3,
          title: 'Section Three - Lesson Three',
          body: '<p>Section Three - Lesson Three</p>',
        },
      ],
    },
    {
      id: '4',
      title: 'Section Four',
      order: 4,
      lessons: [
        {
          id: '1',
          order: 1,
          title: 'Section Four - Lesson One',
          body: '<p>Section Four - Lesson One</p>',
        },
        {
          id: '2',
          order: 2,
          title: 'Section Four - Lesson Two',
          body: '<p>Section Four - Lesson Two</p>',
        },
        {
          id: '3',
          order: 3,
          title: 'Section Four - Lesson Three',
          body: '<p>Section Four - Lesson Three</p>',
        },
      ],
    },
  ],
};

export default course;
