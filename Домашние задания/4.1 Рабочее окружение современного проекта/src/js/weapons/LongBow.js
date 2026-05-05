import Bow from './Bow';

export default class LongBow extends Bow {
  constructor() {
    super();
    this.name = 'Длинный лук';
    this.attack = 15;
    this.range = 4;
  }
}
