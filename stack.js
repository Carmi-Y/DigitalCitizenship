// Nicely incapsulate the the weird logic associated with using JS arrys as Stacks
class Stack {
    // Initiliaze the stack with an array as a data structure
    constructor() {
        this.items = [];
    }

    // Add a new item at the top of the stack
    push(item) {
        this.items.push(item);
    }

    // Get the top most item at the top of the stack and remove it from the stack
    pop() {
        return this.items.length == 0 ? null : this.items.pop();
    }

    // Check if the stack is empty 
    isEmpty() {
        return this.items.length == 0;
    }
}