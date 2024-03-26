
public class Solution {

    private record SwapIndexes(int left, int right) {}
    private static final int NO_SUCH_POSITIVE_INTEGER_EXISTS = -1;

    public int nextGreaterElement(int inputValue) {
        if (inputValue == Integer.MAX_VALUE) {
            return NO_SUCH_POSITIVE_INTEGER_EXISTS;
        }

        int[] inpuValueAsArray = createInpuValueAsArray(inputValue);
        SwapIndexes swapIndexes = findSwapIndexes(inpuValueAsArray);

        if (swapIndexes.left == swapIndexes.right) {
            return NO_SUCH_POSITIVE_INTEGER_EXISTS;
        }

        swapValues(inpuValueAsArray, swapIndexes.left, swapIndexes.right);
        sortTrailingValuesAfterSwapInIncreasingOrder(inpuValueAsArray, swapIndexes.left + 1);
        long nextGreaterElement = createNextGreaterElement(inpuValueAsArray);

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

    private int[] createInpuValueAsArray(int inputValue) {
        int numberOfDigits = findNumberOfDigits(inputValue);
        int[] inpuValueAsArray = new int[numberOfDigits];
        int index = inpuValueAsArray.length - 1;

        while (inputValue > 0) {
            inpuValueAsArray[index--] = inputValue % 10;
            inputValue /= 10;
        }
        return inpuValueAsArray;
    }

    private SwapIndexes findSwapIndexes(int[] inpuValueAsArray) {
        int left = 0;
        int right = 0;

        for (int i = inpuValueAsArray.length - 2; i >= 0 && left == right; --i) {
            for (int j = i + 1; j < inpuValueAsArray.length; ++j) {

                if (inpuValueAsArray[i] < inpuValueAsArray[j] && left == right) {
                    left = i;
                    right = j;
                } else if (inpuValueAsArray[i] < inpuValueAsArray[j] && inpuValueAsArray[j] < inpuValueAsArray[right]) {
                    right = j;
                }
            }
        }
        return new SwapIndexes(left, right);
    }

    private void sortTrailingValuesAfterSwapInIncreasingOrder(int[] inpuValueAsArray, int startIndex) {
        int left = startIndex;
        int right = inpuValueAsArray.length - 1;

        while (left < right && inpuValueAsArray[left] > inpuValueAsArray[right]) {
            swapValues(inpuValueAsArray, left, right);
            ++left;
            --right;
        }
    }

    private void swapValues(int[] inpuValueAsArray, int left, int right) {
        int temp = inpuValueAsArray[left];
        inpuValueAsArray[left] = inpuValueAsArray[right];
        inpuValueAsArray[right] = temp;
    }

    private long createNextGreaterElement(int[] inpuValueAsArray) {
        long nextGreaterElement = 0;
        for (int n : inpuValueAsArray) {
            nextGreaterElement = nextGreaterElement * 10 + n;
        }
        return nextGreaterElement;
    }
}
