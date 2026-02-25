describe("About this (about_this.js)", function() {
  it("'this' inside a method", function () {
    let person = {
      name: 'bob',
      intro: function () {
        return "Hello, my name is " + this.name;
      }
    }

    // Если у объекта есть метод, можно ли получить доступ к свойствам внутри него?
    expect(person.intro()).toBe("Hello, my name is bob");
  });

  it("'this' on unattached function", function () {
    let person = {
      globalName: 'bob',
      intro: function () {
        return "Hello, my name is " + this.globalName;
      }
    }

    let alias = person.intro;

    // Если функция не вызывается как свойство объекта, 'this' является глобальным контекстом
    // Например глобальный объект window. Пожалуйста, не делайте этого на практике.
    window.globalName = 'Peter';

    // Какое значение будет у this, если это не часть объекта?
    expect(alias()).toBe("Hello, my name is Peter");
  });

  it("'this' set explicitly", function () {
    let person = {
      name: 'bob',
      intro: function () {
        return "Hello, my name is " + this.name;
      }
    }

    // Вызов функции с помощью "call" позволяет нам явно назначить "this"
    let message = person.intro.call({name: "Frank"});

    // К чему относится "this" при использовании метода "call()"?
    expect(message).toBe("Hello, my name is Frank");
  });
});

