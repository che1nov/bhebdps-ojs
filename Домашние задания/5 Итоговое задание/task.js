class Weapon {
  constructor(name, attack, durability, range) {
    this.name = name;
    this.attack = attack;
    this.durability = durability;
    this.initDurability = durability;
    this.range = range;
  }

  takeDamage(damage) {
    this.durability = Math.max(0, this.durability - damage);
  }

  getDamage() {
    if (this.durability <= 0) {
      return 0;
    }

    if (this.durability >= this.initDurability * 0.3) {
      return this.attack;
    }

    return this.attack / 2;
  }

  isBroken() {
    return this.durability === 0;
  }
}

class Arm extends Weapon {
  constructor() {
    super('Рука', 1, Infinity, 1);
  }
}

class Bow extends Weapon {
  constructor() {
    super('Лук', 10, 200, 3);
  }
}

class Sword extends Weapon {
  constructor() {
    super('Меч', 25, 500, 1);
  }
}

class Knife extends Weapon {
  constructor() {
    super('Нож', 5, 300, 1);
  }
}

class Staff extends Weapon {
  constructor() {
    super('Посох', 8, 300, 2);
  }
}

class LongBow extends Bow {
  constructor() {
    super();
    this.name = 'Длинный лук';
    this.attack = 15;
    this.range = 4;
  }
}

class Axe extends Sword {
  constructor() {
    super();
    this.name = 'Секира';
    this.attack = 27;
    this.durability = 800;
    this.initDurability = 800;
  }
}

class StormStaff extends Staff {
  constructor() {
    super();
    this.name = 'Посох Бури';
    this.attack = 10;
    this.range = 3;
  }
}

class Player {
  constructor(position, name) {
    this.life = 100;
    this.magic = 20;
    this.speed = 1;
    this.attack = 10;
    this.agility = 5;
    this.luck = 10;
    this.description = 'Игрок';
    this.position = position;
    this.name = name;

    this.weaponStack = [Arm];
    this.weaponIndex = 0;
    this.weapon = new this.weaponStack[this.weaponIndex]();

    this.maxLife = this.life;
    this.maxMagic = this.magic;
  }

  setWeaponStack(weaponStack) {
    this.weaponStack = weaponStack;
    this.weaponIndex = 0;
    this.weapon = new this.weaponStack[this.weaponIndex]();
  }

  updateMaximumStats() {
    this.maxLife = this.life;
    this.maxMagic = this.magic;
  }

  getLuck() {
    return (Math.random() * 100 + this.luck) / 100;
  }

  getDamage(distance) {
    if (distance > this.weapon.range || distance <= 0) {
      return 0;
    }

    const weaponDamage = this.weapon.getDamage();
    return ((this.attack + weaponDamage) * this.getLuck()) / distance;
  }

  takeDamage(damage) {
    this.life = Math.max(0, this.life - damage);
  }

  isDead() {
    return this.life === 0;
  }

  moveLeft(distance) {
    const step = Math.min(Math.abs(distance), this.speed);
    this.position -= step;
  }

  moveRight(distance) {
    const step = Math.min(Math.abs(distance), this.speed);
    this.position += step;
  }

  move(distance) {
    if (distance < 0) {
      this.moveLeft(distance);
      return;
    }

    this.moveRight(distance);
  }

  isAttackBlocked() {
    return this.getLuck() > (100 - this.luck) / 100;
  }

  dodged() {
    return this.getLuck() > (100 - this.agility - this.speed * 3) / 100;
  }

  takeAttack(damage) {
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
      this.checkWeapon();
      return;
    }

    if (this.dodged()) {
      return;
    }

    this.takeDamage(damage);
  }

  checkWeapon() {
    if (!this.weapon.isBroken()) {
      return;
    }

    if (this.weaponIndex >= this.weaponStack.length - 1) {
      return;
    }

    this.weaponIndex += 1;
    this.weapon = new this.weaponStack[this.weaponIndex]();
  }

  tryAttack(enemy) {
    const distance = Math.abs(this.position - enemy.position);

    if (this.weapon.range < distance) {
      return;
    }

    this.weapon.takeDamage(10 * this.getLuck());

    const damage = this.getDamage(distance || 1);

    if (this.position === enemy.position) {
      enemy.moveRight(1);
      enemy.takeAttack(damage * 2);
    } else {
      enemy.takeAttack(damage);
    }

    this.checkWeapon();
  }

  chooseEnemy(players) {
    const enemies = players.filter((player) => player !== this && !player.isDead());

    if (enemies.length === 0) {
      return null;
    }

    return enemies.reduce((selectedEnemy, currentEnemy) => {
      if (currentEnemy.life < selectedEnemy.life) {
        return currentEnemy;
      }

      return selectedEnemy;
    });
  }

  moveToEnemy(enemy) {
    if (!enemy) {
      return;
    }

    this.move(enemy.position - this.position);
  }

  turn(players) {
    if (this.isDead()) {
      return;
    }

    const alivePlayers = players.filter((player) => !player.isDead());
    const enemy = this.chooseEnemy(alivePlayers);

    if (!enemy) {
      return;
    }

    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
  }
}

class Warrior extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 120;
    this.speed = 2;
    this.description = 'Воин';

    this.setWeaponStack([Sword, Knife, Arm]);
    this.updateMaximumStats();
  }

  takeDamage(damage) {
    if (this.life < this.maxLife / 2 && this.magic > 0 && this.getLuck() > 0.8) {
      this.magic = Math.max(0, this.magic - damage);
      return;
    }

    super.takeDamage(damage);
  }
}

class Archer extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 35;
    this.attack = 5;
    this.agility = 10;
    this.description = 'Лучник';

    this.setWeaponStack([Bow, Knife, Arm]);
    this.updateMaximumStats();
  }

  getDamage(distance) {
    if (distance > this.weapon.range || distance <= 0) {
      return 0;
    }

    const weaponDamage = this.weapon.getDamage();
    return ((this.attack + weaponDamage) * this.getLuck() * distance) / this.weapon.range;
  }
}

class Mage extends Player {
  constructor(position, name) {
    super(position, name);
    this.life = 70;
    this.magic = 100;
    this.attack = 5;
    this.agility = 8;
    this.description = 'Маг';

    this.setWeaponStack([Staff, Knife, Arm]);
    this.updateMaximumStats();
  }

  takeDamage(damage) {
    if (this.magic > this.maxMagic / 2) {
      this.magic = Math.max(0, this.magic - 12);
      super.takeDamage(damage / 2);
      return;
    }

    super.takeDamage(damage);
  }
}

class Dwarf extends Warrior {
  constructor(position, name) {
    super(position, name);
    this.life = 130;
    this.attack = 15;
    this.luck = 20;
    this.description = 'Гном';

    this.setWeaponStack([Axe, Knife, Arm]);
    this.updateMaximumStats();

    this.hitCounter = 0;
  }

  takeDamage(damage) {
    this.hitCounter += 1;

    if (this.hitCounter % 6 === 0 && this.getLuck() > 0.5) {
      super.takeDamage(damage / 2);
      return;
    }

    super.takeDamage(damage);
  }
}

class Crossbowman extends Archer {
  constructor(position, name) {
    super(position, name);
    this.life = 85;
    this.attack = 8;
    this.agility = 20;
    this.luck = 15;
    this.description = 'Арбалетчик';

    this.setWeaponStack([LongBow, Knife, Arm]);
    this.updateMaximumStats();
  }
}

class Demiurge extends Mage {
  constructor(position, name) {
    super(position, name);
    this.life = 80;
    this.magic = 120;
    this.attack = 6;
    this.luck = 12;
    this.description = 'Демиург';

    this.setWeaponStack([StormStaff, Knife, Arm]);
    this.updateMaximumStats();
  }

  getDamage(distance) {
    if (distance > this.weapon.range || distance <= 0) {
      return 0;
    }

    const luck = this.getLuck();
    const weaponDamage = this.weapon.getDamage();
    let damage = ((this.attack + weaponDamage) * luck) / distance;

    if (this.magic > 0 && luck > 0.6) {
      damage *= 1.5;
    }

    return damage;
  }
}

function play(players) {
  let alivePlayers = players.filter((player) => !player.isDead());

  if (alivePlayers.length <= 1) {
    return alivePlayers[0] || null;
  }

  let rounds = 0;
  const maxRounds = 10000;

  while (alivePlayers.length > 1 && rounds < maxRounds) {
    players.forEach((player) => {
      player.turn(players);
    });

    alivePlayers = players.filter((player) => !player.isDead());
    rounds += 1;
  }

  return alivePlayers[0] || null;
}

const exported = {
  Weapon,
  Arm,
  Bow,
  Sword,
  Knife,
  Staff,
  LongBow,
  Axe,
  StormStaff,
  Player,
  Warrior,
  Archer,
  Mage,
  Dwarf,
  Crossbowman,
  Demiurge,
  play,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = exported;
}

if (typeof window !== 'undefined') {
  Object.assign(window, exported);
}
