const {
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
} = require('./task');

describe('Weapon hierarchy', () => {
  test('base weapon takes damage and computes attack state', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);

    expect(weapon.getDamage()).toBe(20);

    weapon.takeDamage(5);
    expect(weapon.durability).toBe(5);
    expect(weapon.getDamage()).toBe(20);

    weapon.takeDamage(3);
    expect(weapon.durability).toBe(2);
    expect(weapon.getDamage()).toBe(10);

    weapon.takeDamage(50);
    expect(weapon.durability).toBe(0);
    expect(weapon.getDamage()).toBe(0);
    expect(weapon.isBroken()).toBe(true);
  });

  test.each([
    ['Arm', Arm, 'Рука', 1, Infinity, 1],
    ['Bow', Bow, 'Лук', 10, 200, 3],
    ['Sword', Sword, 'Меч', 25, 500, 1],
    ['Knife', Knife, 'Нож', 5, 300, 1],
    ['Staff', Staff, 'Посох', 8, 300, 2],
    ['LongBow', LongBow, 'Длинный лук', 15, 200, 4],
    ['Axe', Axe, 'Секира', 27, 800, 1],
    ['StormStaff', StormStaff, 'Посох Бури', 10, 300, 3],
  ])('%s has expected base params', (_, WeaponCtor, name, attack, durability, range) => {
    const weapon = new WeaponCtor();

    expect(weapon.name).toBe(name);
    expect(weapon.attack).toBe(attack);
    expect(weapon.durability).toBe(durability);
    expect(weapon.range).toBe(range);
  });

  test('arm durability stays infinity after damage', () => {
    const arm = new Arm();
    arm.takeDamage(1000);

    expect(arm.durability).toBe(Infinity);
    expect(arm.isBroken()).toBe(false);
  });
});

describe('Player base mechanics', () => {
  test('constructor sets defaults', () => {
    const player = new Player(10, 'Бэтмен');

    const expected = {
      life: 100,
      magic: 20,
      speed: 1,
      attack: 10,
      agility: 5,
      luck: 10,
      description: 'Игрок',
      position: 10,
      name: 'Бэтмен',
    };

    Object.entries(expected).forEach(([field, value]) => {
      expect(player[field]).toBe(value);
    });

    expect(player.weapon).toBeInstanceOf(Arm);
  });

  test('getLuck uses random and luck', () => {
    const player = new Player(10, 'Бэтмен');
    const randomSpy = jest.spyOn(Math, 'random').mockReturnValue(0.5);

    expect(player.getLuck()).toBeCloseTo(0.6, 10);

    randomSpy.mockRestore();
  });

  test.each([
    [1, 11],
    [2, 0],
    [0, 0],
  ])('getDamage(distance=%s)', (distance, expectedDamage) => {
    const player = new Player(10, 'Человек-паук');
    player.getLuck = () => 1;

    expect(player.getDamage(distance)).toBe(expectedDamage);
  });

  test('takeDamage and isDead work', () => {
    const player = new Player(1, 'Хоббит');

    player.takeDamage(20);
    expect(player.life).toBe(80);

    player.takeDamage(1000);
    expect(player.life).toBe(0);
    expect(player.isDead()).toBe(true);
  });

  test('movement methods obey speed limit', () => {
    const player = new Warrior(6, 'Алёша Попович');

    const moves = [
      ['moveLeft', 5, 4],
      ['moveRight', 2, 6],
      ['move', -100, 4],
      ['move', 1, 5],
    ];

    moves.forEach(([method, arg, expectedPosition]) => {
      player[method](arg);
      expect(player.position).toBe(expectedPosition);
    });
  });

  test.each([
    [0, false, false],
    [1, true, true],
  ])('isAttackBlocked/dodged with luck=%s', (luck, blocked, dodged) => {
    const player = new Player(0, 'Игрок');
    player.getLuck = () => luck;

    expect(player.isAttackBlocked()).toBe(blocked);
    expect(player.dodged()).toBe(dodged);
  });

  test.each([
    ['blocked', true, false, 100, 100, 400],
    ['dodged', false, true, 999, 100, 500],
    ['direct-hit', false, false, 35, 65, 500],
  ])(
    'takeAttack scenario: %s',
    (_, blocked, dodged, incomingDamage, expectedLife, expectedDurability) => {
      const player = new Player(0, 'Цель');
      player.weapon = new Sword();
      player.isAttackBlocked = () => blocked;
      player.dodged = () => dodged;

      player.takeAttack(incomingDamage);

      expect(player.life).toBe(expectedLife);
      expect(player.weapon.durability).toBe(expectedDurability);
    },
  );

  test('checkWeapon switches to next weapon in stack', () => {
    const player = new Warrior(0, 'Воин');

    expect(player.weapon).toBeInstanceOf(Sword);

    player.weapon.takeDamage(10000);
    player.checkWeapon();
    expect(player.weapon).toBeInstanceOf(Knife);

    player.weapon.takeDamage(10000);
    player.checkWeapon();
    expect(player.weapon).toBeInstanceOf(Arm);
  });

  test('tryAttack: no attack if target out of range', () => {
    const attacker = new Warrior(0, 'A');
    const enemy = new Archer(10, 'B');
    enemy.takeAttack = jest.fn();

    attacker.tryAttack(enemy);

    expect(enemy.takeAttack).not.toHaveBeenCalled();
  });

  test('tryAttack: same position pushes enemy and doubles damage', () => {
    const attacker = new Warrior(2, 'A');
    const enemy = new Archer(2, 'B');

    attacker.getLuck = () => 1;
    enemy.takeAttack = jest.fn();

    attacker.tryAttack(enemy);

    expect(enemy.position).toBe(3);
    expect(enemy.takeAttack).toHaveBeenCalledTimes(1);
    expect(enemy.takeAttack.mock.calls[0][0]).toBeGreaterThan(0);
  });

  test('chooseEnemy selects alive enemy with minimal life', () => {
    const player = new Warrior(0, 'A');
    const e1 = new Archer(1, 'E1');
    const e2 = new Mage(2, 'E2');

    e1.life = 20;
    e2.life = 10;

    expect(player.chooseEnemy([player, e1, e2])).toBe(e2);

    e2.life = 0;
    expect(player.chooseEnemy([player, e1, e2])).toBe(e1);
  });

  test('moveToEnemy moves towards enemy', () => {
    const player = new Warrior(10, 'A');
    const enemy = new Archer(2, 'B');

    player.moveToEnemy(enemy);
    expect(player.position).toBe(8);

    player.moveToEnemy(enemy);
    expect(player.position).toBe(6);
  });

  test('turn calls choose->move->attack pipeline', () => {
    const player = new Warrior(0, 'A');
    const enemy = new Archer(3, 'B');

    const chooseSpy = jest.spyOn(player, 'chooseEnemy').mockReturnValue(enemy);
    const moveSpy = jest.spyOn(player, 'moveToEnemy').mockImplementation(() => {});
    const attackSpy = jest.spyOn(player, 'tryAttack').mockImplementation(() => {});

    player.turn([player, enemy]);

    expect(chooseSpy).toHaveBeenCalled();
    expect(moveSpy).toHaveBeenCalledWith(enemy);
    expect(attackSpy).toHaveBeenCalledWith(enemy);
  });
});

describe('Specialized player classes', () => {
  test.each([
    ['Warrior', Warrior, { life: 120, speed: 2, description: 'Воин' }, Sword],
    ['Archer', Archer, { life: 80, magic: 35, attack: 5, agility: 10, description: 'Лучник' }, Bow],
    ['Mage', Mage, { life: 70, magic: 100, attack: 5, agility: 8, description: 'Маг' }, Staff],
    ['Dwarf', Dwarf, { life: 130, attack: 15, luck: 20, description: 'Гном' }, Axe],
    ['Crossbowman', Crossbowman, { life: 85, attack: 8, agility: 20, luck: 15, description: 'Арбалетчик' }, LongBow],
    ['Demiurge', Demiurge, { life: 80, magic: 120, attack: 6, luck: 12, description: 'Демиург' }, StormStaff],
  ])('%s has expected defaults', (_, PlayerCtor, expected, WeaponCtor) => {
    const player = new PlayerCtor(0, 'Тест');

    Object.entries(expected).forEach(([field, value]) => {
      expect(player[field]).toBe(value);
    });

    expect(player.weapon).toBeInstanceOf(WeaponCtor);
  });

  test('warrior can spend magic instead of life when lucky and low hp', () => {
    const warrior = new Warrior(0, 'Воин');
    warrior.life = 50;
    warrior.magic = 20;
    warrior.getLuck = () => 0.9;

    warrior.takeDamage(7);

    expect(warrior.life).toBe(50);
    expect(warrior.magic).toBe(13);

    warrior.magic = 0;
    warrior.takeDamage(7);
    expect(warrior.life).toBe(43);
  });

  test.each([
    [3, 15],
    [1, 5],
    [100, 0],
  ])('archer getDamage(distance=%s)', (distance, expectedDamage) => {
    const archer = new Archer(0, 'Лучник');
    archer.getLuck = () => 1;

    expect(archer.getDamage(distance)).toBe(expectedDamage);
  });

  test('mage takes half damage while mana > 50% and spends 12 mana', () => {
    const mage = new Mage(0, 'Маг');

    mage.takeDamage(20);
    expect(mage.life).toBe(60);
    expect(mage.magic).toBe(88);

    mage.magic = 40;
    mage.takeDamage(20);
    expect(mage.life).toBe(40);
  });

  test('dwarf each sixth hit may be reduced', () => {
    const dwarf = new Dwarf(0, 'Гном');
    dwarf.getLuck = () => 0.6;

    for (let i = 0; i < 5; i += 1) {
      dwarf.takeDamage(10);
    }

    expect(dwarf.life).toBe(80);

    dwarf.takeDamage(10);
    expect(dwarf.life).toBe(75);
  });

  test('demiurge has boosted damage with magic and luck', () => {
    const demiurge = new Demiurge(0, 'Демиург');
    demiurge.getLuck = () => 0.7;

    expect(demiurge.getDamage(1)).toBeCloseTo(16.8, 10);

    demiurge.magic = 0;
    expect(demiurge.getDamage(1)).toBeCloseTo(11.2, 10);
  });
});

describe('play function', () => {
  test('returns null for empty list', () => {
    expect(play([])).toBeNull();
  });

  test('returns single alive player immediately', () => {
    const player = new Warrior(0, 'Победитель');
    expect(play([player])).toBe(player);
  });

  test('returns winner for deterministic battle', () => {
    const p1 = new Warrior(0, 'W');
    const p2 = new Archer(4, 'A');
    const p3 = new Mage(8, 'M');

    [p1, p2, p3].forEach((player) => {
      player.getLuck = () => 1;
      player.isAttackBlocked = () => false;
      player.dodged = () => false;
    });

    const winner = play([p1, p2, p3]);

    expect(winner).not.toBeNull();
    expect(winner.isDead()).toBe(false);
  });
});
