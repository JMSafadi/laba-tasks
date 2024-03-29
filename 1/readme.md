## PLUS FUNCTION

For this function, I decided to use a while loop to iterate through the number strings, adding digit by digit and keeping a remainder, if it exists, for the next iteration. Finally, an if statement is used to add the remainder after the last iteration and return the result.

## MINUS FUNCTION

Function similar to 'plus', but first, we check that the numeric string to which we apply the method is larger than the one received as an argument, to ensure that the result is not negative. 
Unlike addition, when the subtraction between digits is negative, we borrow 10 from the next number, leaving a remainder of 1 to subtract in the next iteration. Each remainder is converted to a string and concatenated to the result at the beginning.

## DIVIDE FUNCTION
First, we check that the divisor is positive. Using a for loop, we iterate through each digit of the dividend. When it is greater than or equal to the divisor, we execute a while loop to subtract it as many times as possible and record the number of times in the variable tempQuotient++. If it is smaller, we simply append a 0. Finally, we remove all unnecessary leading zeros from the result.

## MULTIPLY FUNCTION
Primero chequeamos que ambos numeros sean positivos. Invertimos ambos numeros para que sea mas facil la multiplicacion. Con dos bucles for anidados multiplicamos cada digito del multiplier por el multiplying y sumando el resto correspondiente si es que existe. Luego pusheamos todos los resultados a un array, para despues volver a invertirlo y sumar todos los valores con la funcion .plus() que declaramos anteriormente, dando el resultado final.
