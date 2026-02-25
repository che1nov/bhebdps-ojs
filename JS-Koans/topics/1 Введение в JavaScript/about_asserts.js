describe("About Asserts (about_asserts.js)", function() {
  it('should expect true', function() {
    // Ваше путешествие начинается здесь: Замените значение false на true 
    expect(true).toBe(true);
  });

  // Чтобы понять результат теста, мы должны сравнить ожидаемое значение с реальным.
  it('should expect equality', function() {
    let expectedValue = 2;
    let actualValue = 1 + 1;

    expect(actualValue === expectedValue).toBeTruthy();
  });

  // Некоторые способы утверждения равенства лучше других.
  it('should assert equality a better way', function() {
    let expectedValue = 2;
    let actualValue = 1 + 1;

  // toEqual() сравнивает, используя равенство эквивалетности.
    expect(actualValue).toEqual(expectedValue);
  });

  // Иногда нужно быть точным в том, что вы "печатаете".
  it('should assert equality with ===', function() {
    let expectedValue = '2';
    let actualValue = (1 + 1).toString();

  // toBe() всегда использует строе равенство (===).
    expect(actualValue).toBe(expectedValue);
  });

  // Иногда мы просим вас заполнить значения.
  it('should have filled in values', function() {
    expect(1 + 1).toEqual(2);
  });
});


