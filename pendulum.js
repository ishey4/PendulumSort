// While this is not the pendulum in the code kata page, this is still a pendulum sort of sorts :P 
// This solution should be updatable to match the code kata example. 
//
// The impression I got, was that the pendulum started swinging from the right side of the array (largest number) to the left side,
// and settled in the middle.
// The exercise on code kata the pendulum starts in the middle (smallest number) and swings outward to the right first, then left until it reaches the end.
// As stated, this solution should be modifiable to work for the kata use case (maybe we can do it together :D ). 
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
    
        
function pendulum(values) {
  const returnValue = [...values];  // it is bad practice to mutate your input! 
 
  const swapIndices = (indexA, indexB)=> {
   [returnValue[indexA], returnValue[indexB]] = [returnValue[indexB], returnValue[indexA]];
  }

    let sortCompleted = false;
    const valueCount = returnValue.length - 1;
    
    while (!sortCompleted) {

       // setting defaults to start the sorting loop...
        sortCompleted = true;           // indicates if any swaps had taken place
        let rightIndex = valueCount;    // were we start distributing the numbers from the right
        let leftIndex = 0;              // were we start distributing the numbers from the left
  
        // main sorting loop
        for (let index = 0; index < returnValue.length; index++) {
            const moveRightIndex = !!(index % 2); // toggles between moving the right index and the left index.

            if (index) {                         // fixes a 0 issue.... 
                if (moveRightIndex) {
                    rightIndex = rightIndex - 1; // moving the right index inward
                } else { 
                    leftIndex = leftIndex + 1;   // moving the left index inward
                }
            }

            // comparing the right to the left, but "swapping" signs every other time :P .
           const swapIndex =  (returnValue[leftIndex] < returnValue[rightIndex]) === moveRightIndex
 
            if (leftIndex !== rightIndex && swapIndex) {
                swapIndices(leftIndex, rightIndex)
                sortCompleted = false; // if we did a swap we still need another loop.
            };
        }
    }
  return returnValue;
}