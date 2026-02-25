describe("About Functions And Closure (about_functions_and_closure.js)", function() {
  it("defining functions directly", function() {
    let result = "a";
    function changeResult() {
      // Возможность доступа к переменным, определенным в той же области действия, что и функция, называется "замыканием".
      result = "b";
    };
    changeResult();
    // Какое значение будет у result после вызова функции changeResult?
    expect("b").toBe(result);
  });

  it("assigning functions to variables", function() {
    let triple = function(input) {
      return input * 3;
    };
    // Какое значение получим при передачи числа 4?
    expect(12).toBe(triple(4));
  });

  it("self invoking functions", function() {
    let publicValue = "shared";

    // Самовызывающиеся функции (IIFE) используются для предоставления области действия и создания переменных.
    (function(pv) {
      let secretValue = "password";
      // Какое значение будет в pv?
      expect("shared").toBe(pv);
      // Доступна ли переменная available в этом контексте и какой у неё тип?
      expect("string").toBe(typeof secretValue);
      // Доступна ли переменная publicValue в этом контексте и какой у неё тип?
      expect("string").toBe(typeof publicValue);
    })(publicValue);

    // Доступна ли переменная available в этом контексте и какой у неё тип?
    expect("undefined").toBe(typeof secretValue);
    // Доступна ли переменная publicValue в этом контексте и какой у неё тип?
    expect("string").toBe(typeof publicValue);
  });

  it("arguments array", function() {
    let add = function() {
      let total = 0;
      for(let i = 0; i < arguments.length; i++) {
        // Завершите реализацию этого метода так, чтобы он возвращал сумму своих аргументов
        total += arguments[i];
      }
      return total;
    };

    // сложение 1,2,3,4,5
    expect(15).toBe(add(1,2,3,4,5));
    // сложение 4,7,-2
    expect(9).toBe(add(4,7,-2));
  });

  it("using call to invoke function",function(){
    let invokee = function( message ){
      return this + message;
    };
    
    // Еще один способ вызвать функцию — использовать метод call, который позволяет
    // вам установить контекст «this» вызывающей стороны. Вызов может принимать любое количество аргументов:
    // первый — это всегда контекст, который должен быть установлен в вызываемой
    // функции, и аргументы, которые должны быть отправлены в функцию, несколько аргументов разделяются запятыми.
    let result = invokee.call("I am this!", "Where did it come from?");

    // Какой будет результат вызова функции invokee?
    expect("I am this!Where did it come from?").toBe(result);
  });

  it("using apply to invoke function",function(){
    let invokee = function( message1, message2 ){
      return this + message1 + message2;  
    };

    // Похожим на метод call существует метод apply. У Apply есть только два
    // аргумента: первый — контекст, который должен быть установлен в вызываемой
    // функции, а второй — массив аргументов, которые должны быть переданы в вызываемую функцию.
    let result = invokee.apply("I am this!", ["I am arg1","I am arg2"]);

    // Какой будет результат вызова функции invokee?
    expect("I am this!I am arg1I am arg2").toBe(result);
  });
});
