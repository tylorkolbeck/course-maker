import { v4 as uuidv4 } from 'uuid';

export default class Model {
  id: string = '';
  title: string = '';
  body: string = '';

  constructor(title: string) {
    this.id = uuidv4();
    this.title = title;
  }
}
