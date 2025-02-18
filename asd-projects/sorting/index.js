/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort
//to sort all of the elements of the array from smallest to largest and update the swap counter
async function bubbleSort(array){
    for (var i = 0; i < array.length-1; i++){ //iterates over the array
        for(var j = array.length-1; j > 1; j--){ //responsible for sorting, starts at the end of the array and works its way backwards, comparing the two elements that are next to each other
            if(array[j].value < array[j-1].value){ //if current index's value is less than the value of the previous index, the code inside will run
                swap(array, j, j-1); //swaps the value of the current index and the index before it
                updateCounter(bubbleCounter); //updates the swap counter for the bubble scenario specifically
                await sleep(); //slows the process of the code and allows the calculations to be visible
            }
        }
    }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){
    if(right - left < 0){ //the base case, ends the code if right is less than left
        return;
    }
    var index = await partition(array, left, right); //stores the partition to a variable named index
    if (left < index-1){ //if left is left than the greatest element of the array, the code block is run
        await quickSort(array, left, index-1); //recalls the quicksort function with index - 1 as the right parameter
    }
    if (right > index){ //if right is greater than the partition, the code is run
        await quickSort(array, index, right); //recalls the quicksort function with index as the left parameter
    }

}

// TODOs 4 & 5: Implement partition
async function partition(array, left, right){
    var pivot = array[Math.floor((right + left) / 2)].value; //sets the pivot value to the value in the middle of the array by taking the average
    while(left < right){ //runs while left is less than right
        while(array[left].value < pivot){
            left++; //if the left value is still on the left, it increases the value
        }
        while(array[right].value > pivot){
            right--; //if the right value is still on the right, it decreases the value
        }
        if(left < right){
            swap(array, left, right); //swaps two indexes
            updateCounter(quickCounter); //updates the swap counter for the rocket ships
            await sleep(); //slows things so that they can be seen
        }
    }
    return left + 1; //moves to a part of the array where it has not already been sorted
}

// TODO 1: Implement swap
function swap(array, i, j){ 
    var tempVar = array[i]; //stores the value of the i value of the array in a temporary variable
    array[i] = array[j]; //stores the value of the j value of the array in the i value of the array
    array[j] = tempVar; //stores the original i value of the array from the temporary variable to the j value of the array
    drawSwap(array, i, j); //makes the swap visible
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}