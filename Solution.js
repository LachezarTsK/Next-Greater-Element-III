
/**
 * @param {number} inputValue
 * @return {number}
 */
var nextGreaterElement = function (inputValue) {
    const NO_SUCH_POSITIVE_INTEGER_EXISTS = -1;
    const MAX_INTEGER_VALUE = Math.pow(2, 31) - 1;

    if (inputValue === MAX_INTEGER_VALUE) {
        return NO_SUCH_POSITIVE_INTEGER_EXISTS;
    }

    const inputValueAsArray = createInputValueAsArray(inputValue);
    const swapIndexes = findSwapIndexes(inputValueAsArray);

    if (swapIndexes.left === swapIndexes.right) {
        return NO_SUCH_POSITIVE_INTEGER_EXISTS;
    }

    swapValues(inputValueAsArray, swapIndexes.left, swapIndexes.right);
    sortTrailingValuesAfterSwapInIncreasingOrder(inputValueAsArray, swapIndexes.left + 1);
    let nextGreaterElement = createNextGreaterElement(inputValueAsArray);

    return nextGreaterElement <= MAX_INTEGER_VALUE ? nextGreaterElement : NO_SUCH_POSITIVE_INTEGER_EXISTS;
};

/**
 * @param {number} left
 * @param {number} right
 */
function SwapIndexes(left, right) {
    this.left = left;
    this.right = right;
}

/**
 * @param {number} value
 * @rerurn {number} 
 */
function findNumberOfDigits(value) {
    let numberOfDigits = 0;
    while (value > 0) {
        ++numberOfDigits;
        value = Math.floor(value / 10);
    }
    return numberOfDigits > 0 ? numberOfDigits : 1;
}

/**
 * @param {number} inputValue
 * @rerurn {number[]} 
 */
function createInputValueAsArray(inputValue) {
    const numberOfDigits = findNumberOfDigits(inputValue);
    const inputValueAsArray = new Array(numberOfDigits);
    let index = inputValueAsArray.length - 1;

    while (inputValue > 0) {
        inputValueAsArray[index--] = inputValue % 10;
        inputValue = Math.floor(inputValue / 10);
    }
    return inputValueAsArray;
}

/**
 * @param {number[]} inputValueAsArray
 * @rerurn {SwapIndexes} 
 */
function findSwapIndexes(inputValueAsArray) {
    let left = 0;
    let right = 0;

    for (let i = inputValueAsArray.length - 2; i >= 0 && left === right; --i) {
        for (let j = i + 1; j < inputValueAsArray.length; ++j) {

            if (inputValueAsArray[i] < inputValueAsArray[j] && left === right) {
                left = i;
                right = j;
            } else if (inputValueAsArray[i] < inputValueAsArray[j] && inputValueAsArray[j] < inputValueAsArray[right]) {
                right = j;
            }
        }
    }
    return new SwapIndexes(left, right);
}

/**
 * @param {number[]} inputValueAsArray
 * @param {number} startIndex
 * @rerurn {void} 
 */
function sortTrailingValuesAfterSwapInIncreasingOrder(inputValueAsArray, startIndex) {
    let left = startIndex;
    let right = inputValueAsArray.length - 1;

    while (left < right && inputValueAsArray[left] > inputValueAsArray[right]) {
        swapValues(inputValueAsArray, left, right);
        ++left;
        --right;
    }
}

/**
 * @param {number[]} inputValueAsArray
 * @param {number} left
 * @param {number} right
 * @rerurn {void} 
 */
function swapValues(inputValueAsArray, left, right) {
    let temp = inputValueAsArray[left];
    inputValueAsArray[left] = inputValueAsArray[right];
    inputValueAsArray[right] = temp;
}

/**
 * @param {number[]} inputValueAsArray
 * @rerurn {number} 
 */
function createNextGreaterElement(inputValueAsArray) {
    let nextGreaterElement = 0;
    for (let n of inputValueAsArray) {
        nextGreaterElement = nextGreaterElement * 10 + n;
    }
    return nextGreaterElement;
}
