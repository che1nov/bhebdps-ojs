import Warrior from './Warrior';
import Axe from '../weapons/Axe';

export default class Dwart extends Warrior {
  constructor(position, name) {
    super(position, name);
    this.weapon = new Axe();
  }
}
