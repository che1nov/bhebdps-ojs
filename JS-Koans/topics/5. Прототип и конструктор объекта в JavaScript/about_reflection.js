describe("About Reflection (about_reflection.js)", function() {
  function A() {
    this.aprop = "A";
  };

  function B() {
    this.bprop = "B";
  };

  B.prototype = new A();

  it("hasOwnProperty", function() {
    let b = new B();

    let keys = [];
    for (let propertyName in b) {
      keys.push(propertyName);
    }
    // Сколько элементов в массиве keys?
    expect(2).toBe(keys.length);
    // Какие это элементы?
    expect(["bprop", "aprop"]).toEqual(keys);

    // hasOwnProperty возвращает true, если параметр является свойством непосредственно объекта,
    // но не в том случае, если это свойство доступно через цепочку прототипов.
    let ownKeys = [];
    for(let propertyName in b) {
      if (b.hasOwnProperty(propertyName)) {
        ownKeys.push(propertyName);
      }
    }

    // Сколько элементов в массиве ownKeys?
    expect(1).toBe(ownKeys.length);
    // Какие это элементы?
    expect(["bprop"]).toEqual(ownKeys);
  });

  it("constructor property", function () {
    let a = new A();
    let b = new B();
    // Какой тип конструктора a?
    expect("function").toBe(typeof a.constructor);
    // Какое имя у конструктора a?
    expect("A").toBe(a.constructor.name);
    // Какое имя у конструктора b?
    expect("A").toBe(b.constructor.name);
  });
});
