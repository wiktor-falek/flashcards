import LinkedList from "./linkedList.js";

test("Arguments passed to Linked List to be appended", () => {

    expect(new LinkedList().toArray()).toStrictEqual([]);

    expect(new LinkedList({}).toArray()).toStrictEqual([{}]);

    expect(new LinkedList(1).toArray()).toStrictEqual([1]);

    expect(new LinkedList(1, 2, 3).toArray()).toStrictEqual([1, 2, 3]);

    expect(new LinkedList({ text: "some text" }, { text: "more text" }).toArray())
        .toStrictEqual([{ text: "some text" }, { text: "more text" }]);
});



test("Appending and prepending", () => {
    expect(new LinkedList().append(2).append(3).prepend(1).toArray()).toStrictEqual([1, 2, 3]);

    expect(new LinkedList().append(1).append(2).append(3).toArray()).toStrictEqual([1, 2, 3]);
});