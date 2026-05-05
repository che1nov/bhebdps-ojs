import Mage from './Mage';
import StormStaff from '../weapons/StormStaff';

export default class Demourge extends Mage {
  constructor(position, name) {
    super(position, name);
    this.weapon = new StormStaff();
  }
}
