import Archer from './players/Archer';
import Warrior from './players/Warrior';
import Mage from './players/Mage';
import Dwart from './players/Dwart';
import Crossbowman from './players/Crossbowman';
import Demourge from './players/Demourge';

export default function play() {
  const players = [
    new Archer(0, 'Лучник'),
    new Warrior(1, 'Воин'),
    new Mage(2, 'Маг'),
    new Dwart(3, 'Гном'),
    new Crossbowman(4, 'Арбалетчик'),
    new Demourge(5, 'Демиург'),
  ];

  return players;
}
