
// The impression I got, was that the pendulum started swinging from the right side of the array (largest number) to the left side,
// and settled in the middle. The exercise on code kata the pendulum starts in the middle (smallest number) and swings outward to the right first.
// This demo has be modifiable to work for all variations.
//
// *** In the example the input array is [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] ***
// This solution uses a modified bubble sort. Instead of sorting the elements against the neighbor, we sort them with the
// element across the array [1, ... , 10]. In order to get the pendulum effect and (prevent the number for being sorted in order),
// we switch if they are greater then < or less then > each time the pendulum swings. In this way we get numbers on opposing
// side of the array, between their counterparts on the other side [9, ... , 8, 10].
//
// TL;DR
// How I settled on this solution, devised the sort, and proved the theory. I realized that if you split the array into 2 parts you would end up with
// 2 sorted arrays. So instead of sorting the array normally, we can sort them across from each other! However this posed an issue, you could end up with
// [8,7,...,9,10] here 10 > 8 and 9 > 7. In order to make sure the the numbers end up on the other side, you have to swap the comparing (< and >)
// [9,7,...,8,10] 10 > 9 < 8. This is how you can get to the pendulum motion. Now that I had this all figured out, I had to test this concept.
// This was on a Friday night, and I do not use electricity, or writing utensils. So how could I test this?
// I tested this with my 11 y / o son's help, a deck of Uno cards and 2 knifes! Want more details? lets talk!
//
//   onto the code!

const swings = (arrayLength) => ({
  outsideToInside: {
    initialRightIndex: arrayLength,
    initialLeftIndex: 0,
    rightIncrement: -1,
    leftIncrement: 1,
  },
  insideToOutside: {
    initialRightIndex: Math.round(arrayLength / 2 + 0.3),
    initialLeftIndex: Math.round(arrayLength / 2),
    rightIncrement: 1,
    leftIncrement: -1,
  },
});

const getCadence = (arrayLength) => ({
  startRight: {
    ...swings(arrayLength).outsideToInside,
    swingRight: 0,
  },
  startLeft: {
    ...swings(arrayLength).outsideToInside,
    swingRight: -1,
  },
  startCenterThenRight: {
    ...swings(arrayLength).insideToOutside,
    swingRight: 0,
  },
  startCenterThenLeft: {
    ...swings(arrayLength).insideToOutside,
    swingRight: -1,
  },
});

/**
 *
 * @param {*} values Array of numbers to sort
 * @param {*} getCadence startRight | startLeft | startCenterThenRight | startCenterThenLeft
 * @param {*} startWithLargestNumber Sort from largest to smallest
 */
function pendulum(values, startWithLargestNumber, cadence) {
  const returnValue = [...values]; // it is bad practice to mutate your input!

  const swapIndices = (indexA, indexB) => {
    [returnValue[indexA], returnValue[indexB]] = [returnValue[indexB], returnValue[indexA]];
  };

  let sortCompleted = false;

  while (!sortCompleted) {
    let {
      initialRightIndex: rightIndex, // were we start distributing the numbers from the right
      initialLeftIndex: leftIndex, // were we start distributing the numbers from the left
      rightIncrement,
      leftIncrement,
      swingRight,
    } = getCadence(returnValue.length - 1)[cadence];

    // setting defaults to start the sorting loop...
    sortCompleted = true; // indicates if any swaps had taken place

    // main sorting loop
    for (let index = 0; index < returnValue.length; index++) {
      const moveRightIndex = !!((index % 2) + swingRight); // toggles between moving the right index and the left index.

      if (index) {
        // fixes a 0 issue....
        if (moveRightIndex) {
          rightIndex += rightIncrement; // moving the right index inward
        } else {
          leftIndex += leftIncrement; // moving the left index inward
        }
      }

      // comparing the right to the left, but "swapping" signs every other time :P .
      const swapIndex =
        (returnValue[leftIndex] < returnValue[rightIndex] === startWithLargestNumber) ===
        moveRightIndex;

      const indexWithinBounds =
        leftIndex < returnValue.length &&
        leftIndex >= 0 &&
        rightIndex < returnValue.length &&
        rightIndex >= 0;

      if (
        indexWithinBounds &&
        returnValue[leftIndex] !== returnValue[rightIndex] &&
        leftIndex !== rightIndex &&
        swapIndex
      ) {
        swapIndices(leftIndex, rightIndex);
        sortCompleted = false; // if we did a swap we still need another loop.
      }
    }
  }
  return returnValue;
}
