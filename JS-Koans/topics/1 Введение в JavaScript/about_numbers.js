describe("About Numbers (about_numbers.js)", function() {
  it("types", function() {
    let typeOfIntegers = typeof(6);
    let typeOfFloats = typeof(3.14159);
    // Являются ли целые числа и числа с плавающей точкой одним и тем же типом?
    expect(true).toBe(typeOfIntegers === typeOfFloats);
    // Какой тип у чисел в javascript?
    expect("number").toBe(typeOfIntegers);
    // Какое целое число равно 1.0?
    expect(1).toBe(1.0);
  });

  it("NaN", function() {
    let resultOfFailedOperations = 7/'apple';
    // Что удовлетворит следующее утверждение о равенстве?
    expect(trFILL_ME_INue).toBe(isNaN(resultOfFailedOperations));
    // Что вернёт NaN == NaN?
    expect(true).toBe(resultOfFailedOperations == NaN);
  });
});