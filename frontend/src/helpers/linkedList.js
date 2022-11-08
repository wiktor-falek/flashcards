class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

class LinkedList {
    constructor(...items) {
        this.length = 0;
        this.head = new Node();
        this.tail = this.head;
        this._insertItems(items);
    }

    _insertItems(items) {
        for (const item of items) {
            this.append(item);
        }
    }

    toArray() {
        const arr = []
        let curr = this.head;
        while (curr.next !== null) {
            curr = curr.next;
            arr.push(curr.value);
        }
        return arr;
    }

    append(item) {
        const node = new Node(item);
        this.tail.next = node;
        this.tail = node;
        this.length++;
        return this;
    }

    prepend(item) {
        const node = new Node(item, this.head.next);
        this.head.next = node;
        this.length++;
        return this;
    }

    shift() {
        this.length--;
        return ;
    }

    pop() {
        this.length--;
        return ;
    }
}

export default LinkedList;