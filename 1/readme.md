# String Arithmetic Operations
## Task:

Your task is to implement arithmetic operations on strings without relying on bigint or arithmetic libraries. You need to create functions that perform arithmetic operations as string functions, considering only positive integers (negative numbers can be avoided, as all numbers will be positive integers).

## Functions to Implement:
**String.plus(string):** This function should take another string as input and return the result of adding the two strings together.<br>

**String.minus(string):** This function should take another string as input and return the result of subtracting the second string from the first string. Note that the first parameter will always be greater than the second parameter.<br>

**String.divide(string):** This function should take another string as input and return the result of dividing the first string by the second string. Division should only result in an integer value.<br>

**String.multiply(string):** This function should take another string as input and return the result of multiplying the two strings together.<br>

## Constraints:
- All input and output numbers will be positive integers.
- For subtraction, ensure that the first parameter is always greater than the second parameter.
- Division should only result in an integer value.
<br>

## .plus()

For this function, I decided to use a while loop to iterate through the number strings, adding digit by digit and keeping a remainder, if it exists, for the next iteration. Finally, an if statement is used to add the remainder after the last iteration and return the result.

## .minus()

Function similar to 'plus', but first, we check that the numeric string to which we apply the method is larger than the one received as an argument, to ensure that the result is not negative. 
Unlike addition, when the subtraction between digits is negative, we borrow 10 from the next number, leaving a remainder of 1 to subtract in the next iteration. Each remainder is converted to a string and concatenated to the result at the beginning.

## .divide()
First, we check that the divisor is positive. Using a for loop, we iterate through each digit of the dividend. When it is greater than or equal to the divisor, we execute a while loop to subtract it as many times as possible and record the number of times in the variable tempQuotient++. If it is smaller, we simply append a 0. Finally, we remove all unnecessary leading zeros from the result.

## .multiply()
First, we check that both numbers are positive. We reverse both numbers to make multiplication easier. Using two nested for loops, we multiply each digit of the multiplier by the multiplying and add the corresponding remainder if it exists. Then, we push all the results to an array, then reverse it again, and sum all the values using the .plus() function we declared earlier, giving the final result.
