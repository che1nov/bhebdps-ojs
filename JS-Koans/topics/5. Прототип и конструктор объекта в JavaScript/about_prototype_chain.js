// https://developer.mozilla.org/en/JavaScript/Guide/Inheritance_and_the_prototype_chain
describe("About Prototype Chain (about_prototype_chain.js)", function() {
  let father = {
    b: 3,
    c: 4
  };
  
  let child = Object.create(father);
  child.a = 1;
  child.b = 2;
  
  /*
   * ---------------------- ---- ---- ----
   *                      [a]  [b]  [c]
   * ---------------------- ---- ---- ----
   * [child]               1    2
   * ---------------------- ---- ---- ----
   * [father]                   3    4
   * ---------------------- ---- ---- ----
   * [Object.prototype]
   * ---------------------- ---- ---- ----
   * [null]
   * ---------------------- ---- ---- ----
   * */
  
  it("Is there an 'a' and 'b' own property on child?", function () {
    expect(true).toBe(child.hasOwnProperty('a'));
    expect(true).toBe(child.hasOwnProperty('b'));
  });
  
  it("Is there an 'a' and 'b' property on child?", function () {
    expect(1).toBe(child.a);
    expect(2).toBe(child.b);
  });
  
  it("If 'b' was removed, whats b value?", function () {
    delete child.b;
    // Что теперь в свойстве b?
    expect(3).toBe(child.b);
  });
  
  
  it("Is there a 'c' own property on child?", function () {
    expect(false).toBe(child.hasOwnProperty('c'));
  });
  
  // Есть ли собственное свойство 'c' в child? Нет, посмотрите у прототипа
  // Есть ли свойство 'c' в child (включая прототип)? Да, его значение...
  it("Is there a 'c' property on child?", function () {
    expect(4).toBe(child.c);
  });
  
  
  // Есть ли собственное свойство 'd' в child? Если нет, то посмотрите у прототипа
  // Есть ли свойство 'd' прототипе child? Если да, его значение...
  // Если обращение child.[[Prototype]].[[Prototype]] возвращает null, то поиск прекращается, свойство отсутствует, вернёт...
  it("Is there an 'd' property on child?", function () {
    expect(undefined).toBe(child.d);
  });
});
