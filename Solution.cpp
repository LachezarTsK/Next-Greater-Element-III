
#include <span>
#include <vector>
#include <limits>
using namespace std;

class Solution {

    struct SwapIndexes {
        size_t left;
        size_t right;
        SwapIndexes() = default;
        SwapIndexes(size_t left, size_t right) : left{ left }, right{ right } {}
    };

    static const int NO_SUCH_POSITIVE_INTEGER_EXISTS = -1;

public:
    int nextGreaterElement(int inputValue) const {
        if (inputValue == numeric_limits<int>::max()) {
            return NO_SUCH_POSITIVE_INTEGER_EXISTS;
        }

        vector<int> inputValueAsVector = createInputValueAsVector(inputValue);
        SwapIndexes swapIndexes = findSwapIndexes(inputValueAsVector);

        if (swapIndexes.left == swapIndexes.right) {
            return NO_SUCH_POSITIVE_INTEGER_EXISTS;
        }

        swapValues(inputValueAsVector, swapIndexes.left, swapIndexes.right);
        sortTrailingValuesAfterSwapInIncreasingOrder(inputValueAsVector, swapIndexes.left + 1);
        long long nextGreaterElement = createNextGreaterElement(inputValueAsVector);

        // static_cast<int>(nextGreaterElement) is for the sake of clean code
        // without the cast here, 'long long' will be implicitly converted to 'int'
        return nextGreaterElement <= numeric_limits<int>::max()
                ? static_cast<int>(nextGreaterElement)
                : NO_SUCH_POSITIVE_INTEGER_EXISTS;
    }

private:
    int findNumberOfDigits(int value) const {
        int numberOfDigits = 0;
        while (value > 0) {
            ++numberOfDigits;
            value /= 10;
        }
        return numberOfDigits > 0 ? numberOfDigits : 1;
    }

    vector<int> createInputValueAsVector(int inputValue) const {
        size_t numberOfDigits = findNumberOfDigits(inputValue);
        vector<int> inputValueAsArray(numberOfDigits);
        size_t index = inputValueAsArray.size() - 1;

        while (inputValue > 0) {
            inputValueAsArray[index--] = inputValue % 10;
            inputValue /= 10;
        }
        return inputValueAsArray;
    }

    SwapIndexes findSwapIndexes(span<const int> inputValueAsArray) const {
        size_t left = 0;
        size_t right = 0;

        for (size_t i = inputValueAsArray.size() - 2; i != variant_npos && left == right; --i) {
            for (size_t j = i + 1; j < inputValueAsArray.size(); ++j) {

                if (inputValueAsArray[i] < inputValueAsArray[j] && left == right) {
                    left = i;
                    right = j;
                }
                else if (inputValueAsArray[i] < inputValueAsArray[j] && inputValueAsArray[j] < inputValueAsArray[right]) {
                    right = j;
                }
            }
        }
        return SwapIndexes(left, right);
    }

    void sortTrailingValuesAfterSwapInIncreasingOrder(span<int> inputValueAsArray, size_t startIndex) const {
        size_t left = startIndex;
        size_t right = inputValueAsArray.size() - 1;

        while (left < right && inputValueAsArray[left] > inputValueAsArray[right]) {
            swapValues(inputValueAsArray, left, right);
            ++left;
            --right;
        }
    }

    void swapValues(span<int> inputValueAsArray, size_t left, size_t right)const {
        int temp = inputValueAsArray[left];
        inputValueAsArray[left] = inputValueAsArray[right];
        inputValueAsArray[right] = temp;
    }

    long long createNextGreaterElement(span<const int> inputValueAsArray)const {
        long  long nextGreaterElement = 0;
        for (const auto& n : inputValueAsArray) {
            nextGreaterElement = nextGreaterElement * 10 + n;
        }
        return nextGreaterElement;
    }
};
