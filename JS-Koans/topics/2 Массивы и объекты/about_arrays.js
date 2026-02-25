describe("About Arrays (about_arrays.js)", function() {
  it("array literal syntax and indexing", function() {
    let emptyArray = [];
    expect(typeof emptyArray).toBe("object"); // Ошибка? - https://learn.javascript.ru/types-intro
    expect(emptyArray.length).toBe(0);

    let multiTypeArray = [0, 1, "two", function () { return 3; }, {value1: 4, value2: 5}, [6, 7]];
    expect(multiTypeArray[0]).toBe(0);
    expect(multiTypeArray[2]).toBe("two");
    expect(multiTypeArray[3]()).toBe(3);
    expect(multiTypeArray[4].value1).toBe(4);
    expect(multiTypeArray[4]["value2"]).toBe(5);
    expect(multiTypeArray[5][0]).toBe(6);
  });

  it("understand array literals", function () {
    let array = [];
    expect(array).toEqual([]);

    array[0] = 1;
    expect(array).toEqual([1]);

    array[1] = 2;
    expect(array).toEqual([1, 2]);

    array.push(3);
    expect(array).toEqual([1, 2, 3]);
  });

  it("length", function() {
    let fourNumberArray = [1, 2, 3, 4];

    expect(fourNumberArray.length).toBe(4);
    fourNumberArray.push(5, 6);
    expect(fourNumberArray.length).toBe(6);

    let tenEmptyElementArray = new Array(10);
    expect(tenEmptyElementArray.length).toBe(10);

    tenEmptyElementArray.length = 5;
    expect(tenEmptyElementArray.length).toBe(5);
  });

  it("slice", function () {
    let array = ["peanut", "butter", "and", "jelly"];

    expect(array.slice(0, 1)).toEqual("peanut");
    expect(array.slice(0, 2)).toEqual(["peanut", "butter"]);
    expect(array.slice(2, 2)).toEqual([]);
    expect(array.slice(2, 20)).toEqual(["and", "jelly"]);
    expect(array.slice(3, 0)).toEqual([]);
    expect(array.slice(3, 100)).toEqual(["jelly"]);
    expect(array.slice(5, 1)).toEqual([]);
    });

  it("splice", function() {
    let daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let workingWeek = daysOfWeek.splice(0, 5);
    let weekend = daysOfWeek;

    // Какое значение в workingWeek?
    expect(workingWeek).toEqual(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
    // Какое значение в weekend?
    expect(weekend).toEqual(['Saturday', 'Sunday']);
  });

  it("stack methods", function() {
    let stack = [];
    stack.push("first");
    stack.push("second");

    // Какое значение будет первым удалено со стека?
    expect("second").toBe(stack.pop());
    expect(stack).toEqual(["first"]);
    // Какое значение будет вторым удалено со стека?
    expect("first").toBe(stack.pop());
    expect(stack).toEqual([]);
  });

  it("queue methods", function() {
    let queue = [];
    queue.push("first");
    queue.push("second");
    queue.unshift("third");

    // Какое значение будет удалено первым?
    expect("third").toBe(queue.shift());
    expect(queue).toEqual(["first", "second"]);
    // Какое значение будет удалено вторым?
    expect("first").toBe(queue.shift());
    expect(queue).toEqual(["second"]);
  });

  it("should know array references", function () {
    let array = [ "zero", "one", "two", "three", "four", "five" ];

    function passedByReference(refArray) {
      refArray[1] = "changed in function";
    }
    passedByReference(array);
    expect(array[1]).toBe("changed in function");
  
    let assignedArray = array;
    assignedArray[5] = "changed in assignedArray";
    expect(array[5]).toBe("changed in assignedArray");

    let copyOfArray = array.slice();
    copyOfArray[3] = "changed in copyOfArray";
    expect(array[3]).toBe("three");
  });
});
