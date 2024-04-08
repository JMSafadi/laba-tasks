# Types conversion
## Task:

Create a JavaScript library that provides advanced data transformation functions. The library should include the following features:

## Functions to Implement:
**addValues:** Accepts two arguments of any type and performs the appropriate addition operation based on the types of the arguments. The function should return the result of the addition. If the addition is not possible, it should throw an error.<br>

**stringifyValue:** Accepts a single argument of any type and converts it to a string representation. For objects and arrays, use JSON.stringify() for serialization. For other types, use the appropriate built-in methods or operations to convert them to strings.r.<br>

**invertBoolean:** Accepts a single boolean argument and returns its inverted value. If the argument is not a boolean, it should throw an error.<br>

**convertToNumber:** Accepts a single argument of any type and attempts to convert it to a number. For strings, use parseFloat() or parseInt() for conversion. For other types, use appropriate operations or functions to perform the conversion. If the conversion is not possible, it should throw an error.<br>

**coerceToType:** Accepts two arguments: value and type. It attempts to convert the value to the specified type using type coercion. The function should return the coerced value if successful. If the coercion is not possible, it should throw an error.<br>

## Optional:
Implement additional functions of your choice that demonstrate advanced type conversion scenarios or cater to specific use cases related to primitive types. You are encouraged to explore complex scenarios and push the limits of type conversion.
<br>