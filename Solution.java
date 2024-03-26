
public class Solution {

    private record SwapIndexes(int left, int right) {}
    private static final int NO_SUCH_POSITIVE_INTEGER_EXISTS = -1;

    public int nextGreaterElement(int inputValue) {
        if (inputValue == Integer.MAX_VALUE) {
            return NO_SUCH_POSITIVE_INTEGER_EXISTS;
        }

        int[] inputValueAsArray = createInputValueAsArray(inputValue);
        SwapIndexes swapIndexes = findSwapIndexes(inputValueAsArray);

        if (swapIndexes.left == swapIndexes.right) {
            return NO_SUCH_POSITIVE_INTEGER_EXISTS;
        }

        swapValues(inputValueAsArray, swapIndexes.left, swapIndexes.right);
        sortTrailingValuesAfterSwapInIncreasingOrder(inputValueAsArray, swapIndexes.left + 1);
        long nextGreaterElement = createNextGreaterElement(inputValueAsArray);

        return nextGreaterElement <= Integer.MAX_VALUE ? (int) nextGreaterElement : NO_SUCH_POSITIVE_INTEGER_EXISTS;
    }

    private int findNumberOfDigits(int value) {
        int numberOfDigits = 0;
        while (value > 0) {
            ++numberOfDigits;
            value /= 10;
        }
        return numberOfDigits > 0 ? numberOfDigits : 1;
    }

    private int[] createInputValueAsArray(int inputValue) {
        int numberOfDigits = findNumberOfDigits(inputValue);
        int[] inputValueAsArray = new int[numberOfDigits];
        int index = inputValueAsArray.length - 1;

        while (inputValue > 0) {
            inputValueAsArray[index--] = inputValue % 10;
            inputValue /= 10;
        }
        return inputValueAsArray;
    }

    private SwapIndexes findSwapIndexes(int[] inputValueAsArray) {
        int left = 0;
        int right = 0;

        for (int i = inputValueAsArray.length - 2; i >= 0 && left == right; --i) {
            for (int j = i + 1; j < inputValueAsArray.length; ++j) {

                if (inputValueAsArray[i] < inputValueAsArray[j] && left == right) {
                    left = i;
                    right = j;
                } else if (inputValueAsArray[i] < inputValueAsArray[j] && inputValueAsArray[j] < inputValueAsArray[right]) {
                    right = j;
                }
            }
        }
        return new SwapIndexes(left, right);
    }

    private void sortTrailingValuesAfterSwapInIncreasingOrder(int[] inputValueAsArray, int startIndex) {
        int left = startIndex;
        int right = inputValueAsArray.length - 1;

        while (left < right && inputValueAsArray[left] > inputValueAsArray[right]) {
            swapValues(inputValueAsArray, left, right);
            ++left;
            --right;
        }
    }

    private void swapValues(int[] inputValueAsArray, int left, int right) {
        int temp = inputValueAsArray[left];
        inputValueAsArray[left] = inputValueAsArray[right];
        inputValueAsArray[right] = temp;
    }

    private long createNextGreaterElement(int[] inputValueAsArray) {
        long nextGreaterElement = 0;
        for (int n : inputValueAsArray) {
            nextGreaterElement = nextGreaterElement * 10 + n;
        }
        return nextGreaterElement;
    }
}
