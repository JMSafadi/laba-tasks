const jsonString1 = `
{
  "browsers": {
    "firefox": {
      "name": "Firefox",
      "pref_url": "about:config",
      "releases": {
        "1": {
          "release_date": "2004-11-09",
          "status": "retired",
          "engine": "Gecko",
          "engine_version": 1.7
        }
      }
    }
  }
}
`

const jsonString2 = `
{
  "name": "Julian",
  "lastName": "Safadi",
  "age": 27,
  "email": "julianmatiasafadi@",
  "direcc": {
    "street": "Av. Libertador",
    "number": 3535
  },
}
`

const jsonString3 = `
  {"widget": {
    "debug": "on",
    "window": {
      "title": "Sample Konfabulator Widget",
      "name": "main_window",
      "width": 500,
      "height": 500
    },
    "image": { 
      "src": "Images/Sun.png",
      "name": "sun1",
      "hOffset": 250,
      "vOffset": 250,
      "alignment": "center"
    },
    "text": {
      "data": "Click Here",
      "size": 36,
      "style": "bold",
      "name": "text1",
      "hOffset": 250,
      "vOffset": 100,
      "alignment": "center",
      "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
    }
  }
}    
`

const jsonString4 = `
  {"menu": {
    "header": "SVG Viewer",
    "items": [
        {"id": "Open"},
        {"id": "OpenNew", "label": "Open New"},
        null,
        {"id": "ZoomIn", "label": "Zoom In"},
        {"id": "ZoomOut", "label": "Zoom Out"},
        {"id": "OriginalView", "label": "Original View"},
        null,
        {"id": "Quality"},
        {"id": "Pause"},
        {"id": "Mute"},
        null,
        {"id": "Find", "label": "Find..."},
        {"id": "FindAgain", "label": "Find Again"},
        {"id": "Copy"},
        {"id": "CopyAgain", "label": "Copy Again"},
        {"id": "CopySVG", "label": "Copy SVG"},
        {"id": "ViewSVG", "label": "View SVG"},
        {"id": "ViewSource", "label": "View Source"},
        {"id": "SaveAs", "label": "Save As"},
        null,
        {"id": "Help"},
        {"id": "About", "label": "About Adobe CVG Viewer..."}
      ]
    }
  }
`

console.log('JSON test 1', jsonString1)
console.log('JSON test 2', jsonString2)
console.log('JSON test 3', jsonString3)
console.log('JSON test 4', jsonString4)

// Regular expressions to match values in JSON.
const regExpPatterns = {
  // Search whitespaces. (+) to search one or more, (y) flag to sticky search.
  whitespace: /\s+/y,
  // Search any type of numbers, including exponential, negative and float.
  number: /-?\d+(\.\d+)?([eE][+-]?\d+)?/y,
  // Search string, including JSON scape characters or unicode. With (*), zero or more times.
  string: /"(\\["bfnrt\/]|\\u[0-9a-fA-F]{4}|[^"\\])*"/y,
  // Search booleans.
  boolean: /true|false/y,
  // Search nulls.
  null: /null/y,
  // Search punctuation characters.
  punctuation: /[{}\[\]:,]/y
}

// Function to tokenize JSON into an array with type and value.
function tokenize(json) {
  const tokens = []
  let position = 0

  while (position < json.length) {
    let match = null

    // Execute whitespaces regex and update position to skip them.
    regExpPatterns.whitespace.lastIndex = position
    if (match = regExpPatterns.whitespace.exec(json)) {
      position += match[0].length
      continue
    }
    // Execute regex for numbers and push them to tokens array.
    regExpPatterns.number.lastIndex = position
    if (match = regExpPatterns.number.exec(json)) {
      tokens.push({ type: 'Number', value: match[0] })
      position += match[0].length
      continue
    }
    // Execute regex for strings and push them to tokens array.
    regExpPatterns.string.lastIndex = position
    if (match = regExpPatterns.string.exec(json)) {
      // console.log(match)
      tokens.push({ type: 'String', value: match[0] })
      position += match[0].length
      continue
    }
    // Execute regex for booleans and push them to tokens array.
    regExpPatterns.boolean.lastIndex = position
    if (match = regExpPatterns.boolean.exec(json)) {
      tokens.push({ type: 'Boolean', value: match[0] })
      position += match[0].length
      continue
    }
    // Execute regex for null and push them to tokens array.
    regExpPatterns.null.lastIndex = position
    if (match = regExpPatterns.null.exec(json)) {
      tokens.push({ type: 'Null', value: match[0] })
      position += match[0].length
      continue
    }
    // Execute regex for puntuaction and push them to tokens array.
    regExpPatterns.punctuation.lastIndex = position
    if (match = regExpPatterns.punctuation.exec(json)) {
      tokens.push({ type: 'Punctuation', value: match[0] })
      position += match[0].length
      continue
    }
    // Update even if there is no match.
    position++
  }
  // Return final array with tokens to build object.
  return tokens
}

// Function to parse all values for each type case from starting position.
function parseValues(tokens, position, reviver) {
  const token = tokens[position]
  // Convert each primite value from string into corresponding type and add 1 to position to continue.
  switch (token.type) {
    case 'String':
      return [token.value.slice(1, -1), position + 1]
    case 'Number':
      return [parseFloat(token.value), position + 1]
    case 'Boolean':
      return [Boolean(token.value), position + 1]
    case 'Null':
      return [null, position + 1]
    // Parse recursivly complex types: arrays and objetcs.
    case 'Punctuation':
      if (token.value === '{') {
        return parseObject(tokens, position, reviver)
      } else if (token.value === '[') {
        return parseArray(tokens, position)
      }
    default:
      throw new Error(`Unexpected token at position ${position}, got: '${token.value}'`)
  }
}

// Function to parse Objects.
function parseObject(tokens, position, reviver) {  
  const resultObj = {}
  position++

  while (tokens[position].value !== '}') {
    // Parse key.
    const [key, newPosition] = parseValues(tokens, position)
    position = newPosition

    // Value must be ':' after each key.
    if (tokens[position].value !== ':') {
      throw new Error(`Expecting ':' at position ${position}, got '${tokens[position].value}'`)
    }
    position++ // Update position to skip ':'

    // Parse value.
    const [value, newPositionValue] = parseValues(tokens, position)
    position = newPositionValue

    // Assign value to key.
    resultObj[key] = value
  
    if (tokens[position].value === ',') {
      position++
    } else if (tokens[position].value !== '}') {
      throw new Error(`Expected '}' or ',' at position ${position}, got '${tokens[position].value}'`)
    }
  }
  // Skip '}' and return final parsed object.
  position++

  //  Call reviver fn if exists.
  if (reviver) {
    return [reviver(null, resultObj), position]
  }

  return [resultObj, position]
}

// Function to parse Arrays.
function parseArray(tokens, position) {  
  const resultArr = []
  position++

  while (tokens[position].value !== ']') {
    // Parse value and push to new Array.
    const [value, newPosition] = parseValues(tokens, position)
    position = newPosition
    resultArr.push(value)

    // Skip ','.
    if (tokens[position].value === ',') {
      position++
    }
  }
  // Skip ']' and return final array parsed.
  position++
  return [resultArr, position]
}

// Final custom parse function.
function myJSONParse(jsonString, reviver = null) {
  try {
    const tokens = tokenize(jsonString)
    const [result] = parseValues(tokens, 0, reviver)
    return result // Return final object parsed.
  } catch (error) {
    console.error(error)
  }
}

// Reviver function to add property with execution datetime.
function parseDate(key, value) {
  if (!key)  {
    value['parsedAt'] = new Date().toLocaleString()
  }
  return value
}

// Testing different cases.
const parsedObject1 = myJSONParse(jsonString1, parseDate)
console.log('Final object parsed 1:', parsedObject1)

const parsedObject2 = myJSONParse(jsonString2, parseDate)
console.log('Final object parsed 2:', parsedObject2)

const parsedObject3 = myJSONParse(jsonString3)
console.log('Final object parsed 3:', parsedObject3)

const parsedObject4 = myJSONParse(jsonString4)
console.log('Final object parsed 4:', parsedObject4)


// <-- Reflection -->
// I found very interesting this code to understand how some built-in functions in Javascript, like .parse(), perform so many tasks for us. It was challenging but important to understand the JSON syntax to avoid errors when we are working with this format.
// Recursion was an important concept to work with nested structures.
// The debugger was very helpful to follow the values and the execution of functions step by step.

// The most difficult step was to create the regex patterns for all cases and tokenize the JSON into an array. I handle this mainly with the position value and updating it in each execute of regex to mantain start and end of each value correctly. Also helped with the lastIndex property that exec() provides.
// Try to provide clear and brief comments on the code, as if another dev who didn't write it had to understand it.

// Also, I understand the powerful that regular expresions are for working with strings, even with the difficulty of understanding and create new patterns in some cases, specially when they becomes excessively long.
