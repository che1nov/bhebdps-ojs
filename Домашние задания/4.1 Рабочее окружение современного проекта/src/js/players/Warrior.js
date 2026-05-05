import Player from './Player';
import Sword from '../weapons/Sword';

export default class Warrior extends Player {
  constructor(position, name) {
    super(position, name);
    this.weapon = new Sword();
  }
}
