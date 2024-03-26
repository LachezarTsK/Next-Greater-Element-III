
function nextGreaterElement(inputValue: number): number {
    const NO_SUCH_POSITIVE_INTEGER_EXISTS = -1;
    const MAX_INTEGER_VALUE = Math.pow(2, 31) - 1;

    if (inputValue === MAX_INTEGER_VALUE) {
        return NO_SUCH_POSITIVE_INTEGER_EXISTS;
    }

    const inputValueAsArray: number[] = createInputValueAsArray(inputValue);
    const swapIndexes: SwapIndexes = findSwapIndexes(inputValueAsArray);

    if (swapIndexes.left === swapIndexes.right) {
        return NO_SUCH_POSITIVE_INTEGER_EXISTS;
    }

    swapValues(inputValueAsArray, swapIndexes.left, swapIndexes.right);
    sortTrailingValuesAfterSwapInIncreasingOrder(inputValueAsArray, swapIndexes.left + 1);
    let nextGreaterElement = createNextGreaterElement(inputValueAsArray);

    return nextGreaterElement <= MAX_INTEGER_VALUE ? nextGreaterElement : NO_SUCH_POSITIVE_INTEGER_EXISTS;
};

class SwapIndexes {
    constructor(public left: number, public right: number) { }
}

function findNumberOfDigits(value: number): number {
    let numberOfDigits = 0;
    while (value > 0) {
        ++numberOfDigits;
        value = Math.floor(value / 10);
    }
    return numberOfDigits > 0 ? numberOfDigits : 1;
}

function createInputValueAsArray(inputValue: number): number[] {
    const numberOfDigits = findNumberOfDigits(inputValue);
    const inputValueAsArray = new Array<number>(numberOfDigits);
    let index = inputValueAsArray.length - 1;

    while (inputValue > 0) {
        inputValueAsArray[index--] = inputValue % 10;
        inputValue = Math.floor(inputValue / 10);
    }
    return inputValueAsArray;
}

function findSwapIndexes(inputValueAsArray: number[]): SwapIndexes {
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

function sortTrailingValuesAfterSwapInIncreasingOrder(inputValueAsArray: number[], startIndex: number): void {
    let left = startIndex;
    let right = inputValueAsArray.length - 1;

    while (left < right && inputValueAsArray[left] > inputValueAsArray[right]) {
        swapValues(inputValueAsArray, left, right);
        ++left;
        --right;
    }
}

function swapValues(inputValueAsArray: number[], left: number, right: number): void {
    let temp = inputValueAsArray[left];
    inputValueAsArray[left] = inputValueAsArray[right];
    inputValueAsArray[right] = temp;
}

function createNextGreaterElement(inputValueAsArray: number[]): number {
    let nextGreaterElement = 0;
    for (let n of inputValueAsArray) {
        nextGreaterElement = nextGreaterElement * 10 + n;
    }
    return nextGreaterElement;
}
