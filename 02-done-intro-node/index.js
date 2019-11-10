class SortedList {
  constructor() {
    // we have to use keyword "this" to point out that these are the properties of the SortedList class
    // items should be an array
    this.items = [];
    // length should be the number of elements in the array
    this.length = this.items.length;
  }

  add(item) {
    // use .push() to add element to the array
    this.items.push(item);
    // add +1 on the length of the array
    this.length++;
    // sorting array is not necessity but will help us in the later steps
    this.items.sort((a, b) => a - b);
  }

  get(position) {
    // if the array is empty (!this.length)
    // or we are trying to get some element on the position that exceeds the number of elements in the array
    // throw an error
    if (this.length === 0 || position > this.length) {
      throw new Error('OutOfBounds');
    }

    // if all is good, return the element in the asked position
    return this.items[position];
  }

  max() {
    // if the array is empty (this.length === 0 )
    if (this.length === 0) {
      // throw an error
      throw new Error('EmptySortedList');
    }
    // since we work with sorted array, we can simply point the last element of the array as the highest value of the array
    return this.items[this.length - 1];

    // you can use some more fancy ways as well
    // return Math.max(...this.items);
  }

  min() {
    // if the array is empty (this.length === 0 )
    if (this.length === 0) {
      // throw an error
      throw new Error('EmptySortedList');
    }

    // since we work with sorted array, we can simply point the first element of the array as the lowest value of the array
    return this.items[0];
  }

  sum() {
    // if the array is empty (this.length === 0 )
    if (this.length === 0) {
      // sum of the array will be equal to zero
      return 0;
    }
    // using .reduce() array method, we can calculate the sum of the array
    return this.items.reduce((total, currentValue) => total + currentValue);
  }

  average() {
    if (this.length === 0) {
      throw newError('EmptySortedList');
    }
    // we get average simple as dividing sum with the number of elements in the array (which is the length of the array)
    return this.sum() / this.length;
  }
}

module.exports = SortedList;
