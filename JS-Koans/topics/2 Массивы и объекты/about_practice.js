describe("About Applying What We Have Learnt (about_applying_what_we_have_learnt.js)", function() {

  let products;

  beforeEach(function () {
    products = [
      { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
      { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
      { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
      { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
      { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    let hasMushrooms;
    let productsICanEat = [];

    for (let i = 0; i < products.length; i+=1) {
      if (products[i].containsNuts === false) {
        hasMushrooms = false;
        for (let j = 0; j < products[i].ingredients.length; j+=1) {
          if (products[i].ingredients[j] === "mushrooms") {
            hasMushrooms = true;
          }
        }

        if (!hasMushrooms) {
          productsICanEat.push(products[i]);
        }
      }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    let sum = 0;
    for(let i = 1; i < 1000; i += 1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    let ingredientCount = { "{ingredient name}": 0 };

    for (let i = 0; i < products.length; i+=1) {
      for (let j = 0; j < products[i].ingredients.length; j += 1) {
        ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
      }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });
});