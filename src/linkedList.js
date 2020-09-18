class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor(head) {
    this.head = null
  }

  insertFirst(data) {
    this.head = new Node(data, this.head)
  }

  size() {
    let node = this.head;
    let counter = 0;
    while (node) {
      counter++;
      node = node.next;
    }
    return counter;
  }

  getFirst() {
    return this.head;
  }

  getLast() {
    if (!this.head) {
      return null
    }
    let node = this.head;
    while (node) {
      if (!node.next) {
        return node
      }
      node = node.next;
    }
  }

  clear() {
    this.head = null;
  }

  removeFirst() {
    if (!this.head) {
      return
    }
    this.head = this.head.next;
  }

  removeLast() {
    return this.removeAt(this.size() - 1)
  }


  insertLast(data) {
    const node = new Node(data);
    const last = this.getLast();
    last ? last.next = node : this.head = node
  }

  getAt(index) {

    let node = this.head
    let counter = 0;
    while (node) {
      if (counter === index) {
        return node;
      }
      node = node.next;
      counter++;
    }
    return null;  // index is out of bounds or list was empty
  }

  removeAt(index) {
    if (index === 0 && this.head) {  /// reset head to next node
      this.head = this.head.next
      return;
    }
    const previous = this.getAt(index - 1);

    if (!previous || !previous.next) {
      return
    }
    previous.next = previous.next.next
  }

  insertAt(data, index) {

    if (index === 0) {    ///INDEX IS 0
      this.insertFirst(data)
      return;
    }

    /// insert in between
    const previous = this.getAt(index - 1) || this.getLast();
    previous.next = new Node(data, previous.next)

  }

  forEach(fn) {
    let node = this.head
    while (node) {
      fn(node)
      node = node.next
    }
  }

}