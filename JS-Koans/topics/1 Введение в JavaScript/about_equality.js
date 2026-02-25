
describe("About Equality (about_equality.js)", function(){
  it("numeric equality", function() {
    expect(3 + 4).toBe(7);
  });

  it("string equality", function() {
    // Выполните конкатенацию строк
    expect("3" + "7").toBe("37");
  });

  it("equality without type coercion", function() {
    // Чему равно 3?
    expect(3 === 3).toBeTruthy();
  });

  it("equality with type coercion", function() {
    // Какая строка будет равна 3, при нестрогом равенстве?
    expect(3 == "3").toBeTruthy();
  });

  it("string literals", function() {
    // Типы кавычек взаимозамозаменяемы, но должны совпадать.
    expect( "frankenstein" === "frankenstein").toBeTruthy();
    // Кавычки могут быть как одинарными, так и двойными.
    expect('frankenstein' === 'frankenstein').toBeTruthy();
  });
});