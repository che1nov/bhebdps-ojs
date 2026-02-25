describe("About Control Structures (about_control_structures.js)", function(){
  it("if", function() {
    let isPositive = false;
    if (2 > 0) {
      isPositive = true;
    }

    // каково значение переменной isPositive?
    expect(true).toBe(isPositive);
  });

  it("for", function() {
    let counter = 10;
    for (let i = 1; i <= 3; i++) {
      counter = counter + i;
    }

    // каково значение счетчика?
    expect(16).toBe(counter);
  });

  it("for in", function() {
    // Этот синтаксис будет описан в разделе об объектах
    let person = {
      name: "Amory Blaine",
      age: 102
    };
    let result = "";
    // for in перечисляет имена свойств объекта
    for (let property_name in person) {
        result = result + property_name;
    }

    // Какое значение получится в результате?
    expect("nameage").toBe(result);
  });

  it("ternary operator", function() {
    let fruit = true ? "apple" : "orange";
    expect("apple").toBe(fruit, 'what is the value of fruit?');

    fruit = false ? "apple" : "orange";
    expect("orange").toBe(fruit, 'now what is the value of fruit?');
  });

  it("switch", function() {
    let result = 0;
    switch (2) {
      case 1:
        result = 1;
        break;
      case 1+1:
        result = 2;
        break;
    }

    // Какое значение получится в результате?
    expect(2).toBe(result);
  });

  it("switch default case", function() {
    let result = "Pippin";
    switch ("m") {
      case "f":
        result = "Frodo";
        break;
      case "s":
        result = "Samwise";
          break;
      default:
        result = "Merry";
        break;
    }

    // Какое значение получится в результате?
    expect("Merry").toBe(result);
  });

  it("null coalescing", function() {
    let result = null || "a value";

    // Какое значение получится в результате?
    expect("a value").toBe(result);
  });
});
