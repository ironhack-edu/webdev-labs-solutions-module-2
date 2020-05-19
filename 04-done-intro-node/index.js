class SortedList {
  constructor() {
    // we have to use keyword "this" to point out that these are the properties of the SortedList class
    // items should be an array
    this.items = [];
    this.length = this.items.length;
    // or: this.length = 0;
  }

  add(item) {
    if (item !== undefined) {
      // use .push() to add element to the array
      this.items.push(item);
      // add +1 on the length of the array
      this.length++;
      this.items.sort((a, b) => a - b);
    }
    return this.items;
  }

  get(pos) {
    // if the array is empty (!this.length)
    // or we are trying to get some element on the position that exceeds the number of elements in the array
    // throw an error
    if (!this.length || pos > this.length) {
      throw new Error('OutOfBounds');
    }

    // if all is good, return the element in the asked position
    return this.items[pos];
  }

  max() {
    // if the array is empty (!this.length)
    if (this.items.length === 0) {
      throw new Error('EmptySortedList');
    }

    // since we work with sorted array, we can simply point the last element of the array as
    // the highest value of the array
    return this.items[this.length - 1];

    // you can use some more fancy ways as well
    // return Math.max(...this.items);
  }

  min() {
    // if the array is empty (!this.length)
    if (this.items.length === 0) {
      throw new Error('EmptySortedList');
    }

    return Math.min(...this.items);

    // or, since we work with sorted array, we can simply point the first element of
    // the array as the lowest value of the array
    // return this.items[0];
  }

  sum() {
    // return !this.length ? 0 : this.items.reduce((acc, val) => acc + val);
    return this.items.reduce((acc, val) => acc + val, 0);
  }

  avg() {
    // !this.length
    if (this.items.length === 0) {
      throw new Error('EmptySortedList');
    }
    // we get average simple as dividing sum with the number of elements in the array (which is the length of the array)
    return this.sum() / this.length;
  }
}

module.exports = SortedList;
