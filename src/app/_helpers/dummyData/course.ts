import { Course } from '../../../core/Models/Course.model';

const course: Course = {
  id: '1',
  title: 'Course Title',
  createdAt: new Date(),
  sections: [
    {
      id: '2',
      title: 'Section Two',
      order: 2,
      lessons: [
        {
          id: '1',
          order: 1,
          title: 'Section Two - Lesson One',
          body: '<p>Section Two - Lesson One body</p>',
        },
        {
          id: '2',
          order: 2,
          title: 'Section Two - Lesson Two',
          body: '<p>Section Two - Lesson Two body</p>',
        },
        {
          id: '3',
          order: 3,
          title: 'Section Two - Lesson Three',
          body: '<p>Section Two - Lesson Three body</p>',
        },
      ],
    },
    {
      id: '1',
      title: 'Section One',
      order: 1,
      lessons: [
        {
          id: '4',
          order: 3,
          title: 'Section One - Lesson Three',
          body: '<p>Section One - Lesson Three body</p>',
        },

        {
          id: '5',
          order: 2,
          title: 'Section One - Lesson Two',
          body: '<p>Section One - Lesson Two body</p>',
        },
        {
          id: '6',
          order: 1,
          title: 'Section One - Lesson One',
          body: '<p>Section One - Lesson One body</p>',
        },
      ],
    },

    {
      id: '3',
      title: 'Section Three',
      order: 3,
      lessons: [
        {
          id: '7',
          order: 1,
          title: 'Section Three - Lesson One',
          body: '<p>Section Three - Lesson One body</p>',
        },
        {
          id: '8',
          order: 2,
          title: 'Section Three - Lesson Two',
          body: '<p>Section Three - Lesson Two body</p>',
        },
        {
          id: '9',
          order: 3,
          title: 'Section Three - Lesson Three',
          body: '<p>Section Three - Lesson Three body</p>',
        },
      ],
    },
    {
      id: '4',
      title: 'Section Four',
      order: 4,
      lessons: [
        {
          id: '10',
          order: 1,
          title: 'Section Four - Lesson One',
          body: '<p>Section Four - Lesson One body</p>',
        },
        {
          id: '11',
          order: 2,
          title: 'Section Four - Lesson Two',
          body: '<p>Section Four - Lesson Two body</p>',
        },
        {
          id: '12',
          order: 3,
          title: 'Section Four - Lesson Three',
          body: '<p>Section Four - Lesson Three body</p>',
        },
      ],
    },
    {
      id: '5',
      title: 'Section Five',
      order: 5,
      lessons: [
        {
          id: '13',
          order: 1,
          title: 'Section Five - Lesson One',
          body: '<p>Section Five - Lesson One body</p>',
        },
        {
          id: '14',
          order: 2,
          title: 'Section Five - Lesson Two',
          body: '<p>Section Five - Lesson Two body</p>',
        },
        {
          id: '15',
          order: 3,
          title: 'Section Five - Lesson Three',
          body: '<p>Section Five - Lesson Three body</p>',
        },
      ],
    },
    {
      id: '6',
      title: 'Section Six',
      order: 4,
      lessons: [
        {
          id: '16',
          order: 1,
          title: 'Section Six - Lesson One',
          body: '<p>Section Six - Lesson One body</p>',
        },
        {
          id: '17',
          order: 2,
          title: 'Section Six - Lesson Two',
          body: '<p>Section Six - Lesson Two body</p>',
        },
        {
          id: '18',
          order: 3,
          title: 'Section Six - Lesson Three',
          body: '<p>Section Six - Lesson Three body</p>',
        },
      ],
    },
  ],
};

export default course;
