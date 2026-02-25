
describe("About Objects (about_objects.js)", function() {
  it("object type", function() {
    let emptyObject = {};
    // Какой тип у объектов?
    expect("object").toBe(typeof emptyObject);
  });

  it("object literal notation", function() {
    let person = {
      name: "Amory Blaine",
      age: 102
    };
    // Какое имя у объекта person?
    expect("Amory Blaine").toBe(person.name);
    // Какое значение в свойстве age?
    expect(102).toBe(person.age);
  });

  it("dynamically adding properties", function() {
    let person = {};
    person.name = "Amory Blaine";
    person.age = 102;
    // Какое имя у объекта person?
    expect("Amory Blaine").toBe(person.name);
    // Какое значение в свойстве age?
    expect(102).toBe(person.age);
  }); 

  it("adding properties from strings", function() {
    let person = {};
    person["name"] = "Amory Blaine";
    person["age"] = 102;
    // Какое имя у объекта person?
    expect("Amory Blaine").toBe(person.name);
    // Какое значение в свойстве age?
    expect(102).toBe(person.age);
  });

  it("adding functions", function() {
    let person = {
      name: "Amory Blaine",
      age: 102,
      toString: function() {
        return "I " + this.name + " am " + this.age + " years old.";  // Подсказка: используйте ключевое слово 'this' для обращения к объекту person.
      }
    };
    // Какое значение возвращает метод toString?
    expect("I Amory Blaine am 102 years old.").toBe(person.toString());
  });

  it("property enumeration", function() {
    let keys = [];
    let values = [];
    let person = {name: 'Amory Blaine', age: 102, unemployed: true};
    for(let propertyName in person) {
      keys.push(propertyName);
      values.push(person[propertyName]);
    }
    // Какие имена свойств у объекта?
    expect(keys).toEqual(["name", "age", "unemployed"]);
    // Какие значения свойств у объекта?
    expect(values).toEqual(["Amory Blaine", 102, true]);
  });
});
