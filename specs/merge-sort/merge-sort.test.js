/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const mergeSort = (nums) => {
  // base case
  if (nums.length < 2) {
    return nums;
  }

  // clculate the middle
  const mid = Math.floor(nums.length / 2);
  const leftHalf = nums.slice(0, mid);
  const rightHalf = nums.slice(mid);

  // call mergeSort for the left
  const sortedLeft = mergeSort(leftHalf);
  // call mergeSort for the right
  const sortedRight = mergeSort(rightHalf);
  // call merge for the left and the right
  return merge(sortedLeft, sortedRight)
};

const merge = (left, right) => {
  const results = []

  // loop til one array runs outs
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      results.push(left.shift());
    } else {
      results.push(right.shift());
    }
  }

  return results.concat(left, right);
}

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("merge sort", function () {
  const nums = [];
  const ans = mergeSort(nums);
  expect(ans).toEqual([]);
});
