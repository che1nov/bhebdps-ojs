import Weapon from '../weapons/Weapon';
import Arm from '../weapons/Arm';
import Bow from '../weapons/Bow';
import Sword from '../weapons/Sword';
import Knife from '../weapons/Knife';
import Staff from '../weapons/Staff';
import LongBow from '../weapons/LongBow';
import Axe from '../weapons/Axe';
import StormStaff from '../weapons/StormStaff';

describe('Weapon', () => {
  test('should set initial properties', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);

    expect(weapon.name).toBe('Старый меч');
    expect(weapon.attack).toBe(20);
    expect(weapon.durability).toBe(10);
    expect(weapon.initDurability).toBe(10);
    expect(weapon.range).toBe(1);
  });

  test('takeDamage should reduce durability and keep non-negative', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);

    weapon.takeDamage(5);
    expect(weapon.durability).toBe(5);

    weapon.takeDamage(50);
    expect(weapon.durability).toBe(0);
  });

  test('getDamage should return full/half/zero damage by durability', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);

    expect(weapon.getDamage()).toBe(20);

    weapon.takeDamage(8);
    expect(weapon.getDamage()).toBe(10);

    weapon.takeDamage(10);
    expect(weapon.getDamage()).toBe(0);
  });

  test('isBroken should return true only at zero durability', () => {
    const weapon = new Weapon('Старый меч', 20, 10, 1);

    expect(weapon.isBroken()).toBe(false);

    weapon.takeDamage(10);
    expect(weapon.isBroken()).toBe(true);
  });
});

describe('Weapon descendants', () => {
  test.each([
    [Arm, 'Рука', 1, Infinity, 1],
    [Bow, 'Лук', 10, 200, 3],
    [Sword, 'Меч', 25, 500, 1],
    [Knife, 'Нож', 5, 300, 1],
    [Staff, 'Посох', 8, 300, 2],
    [LongBow, 'Длинный лук', 15, 200, 4],
    [Axe, 'Секира', 27, 800, 1],
    [StormStaff, 'Посох Бури', 10, 300, 3],
  ])(
    'class %p should have expected params',
    (ClassRef, expectedName, expectedAttack, expectedDurability, expectedRange) => {
      const weapon = new ClassRef();

      expect(weapon.name).toBe(expectedName);
      expect(weapon.attack).toBe(expectedAttack);
      expect(weapon.durability).toBe(expectedDurability);
      expect(weapon.range).toBe(expectedRange);
    },
  );
});
