// 1
const translations = {
  en: {
    greet: 'Hello',
    intro: 'Welcome to our website'
  },
  fr: {
    greet: 'Bonjour',
    intro: 'Bienvenue sur notre site web'
  }
}

const language = 'fr'
const greeting = 'greet'
const introduction = 'intro'

function localize(strings, ...keywords) {
  const translation = translations[language]
  let result = ''
  keywords.forEach(e => {
    result += translation[e]
  })
  return result
}
console.log(localize`${greeting}`) // Bonjour
console.log(localize`${introduction}`) // Bienvenue sur notre site web

// 2
const keywords = ["JavaScript", "template", "tagged"]
const template = "Learn \${0} tagged templates to create custom \${1} literals for \${2} manipulation."

function highlightKeywords(template, keywords) {
  const templateArr = template.split(' ')
  templateArr.forEach((string, index) => {
    if (string.startsWith('$')) {
      const placeholderIndex = parseInt(string.replace(/\D/g, ''))
      const highlighted = `<span class='highlight'>${keywords[placeholderIndex]}</span>`
      if (placeholderIndex < keywords.length) {
        templateArr[index] = highlighted
      }
    }
  })
  return templateArr.join(' ')
}

console.log(highlightKeywords(template, keywords)) // Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation.


// 3
function multiline(strings, ...keywords) {
  let reducedStr = strings.reduce((acc, str, i) => acc + str + (keywords[i] || ''), '')
  let arrayStr = reducedStr.split('\n')
  const linesWithNum = arrayStr.map((e, index) => {
    const lineNum = index + 1
    const ident = e.match(/^\s*/)[0]
    return `${lineNum} ${ident}${e.trim()}`
  })
  return linesWithNum.join(`\n`)
}
const code = multiline`
function add(a, b) {
  return a + b
}
`
console.log(code)

// 4
function debouncedSearch(query) {
  console.log('Seaching for: ', query)
}

const debouncedSeachHandler = debounce(debouncedSearch, 3000)

function debounce(fn, delay) {
  let timeoutId
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const inputElement = document.getElementById('search-input')

inputElement.addEventListener('input', event => {
  debouncedSeachHandler(event.target.value)
})

// 5
function throttle(fn, interval) {
  let lastExecTime = 0
  return function(...args) {
    const now = performance.now()
    if (now - lastExecTime >= interval) {
      fn.apply(this, args)
      lastExecTime = now
    }
  }
}

function onScroll(event) {
  console.log('Scroll event:', event)
}
const throttledScrollHandler = throttle(onScroll, 1000)
window.addEventListener('scroll', throttledScrollHandler)


// 6
function multiply(a, b, c) {
  return a * b * c
}

const _ = Symbol('_')

function curry(fn, arity) {
  return function curried(...args) {
    const filteredArgs = args.filter(arg => arg !== _)
    if(filteredArgs.length >= arity) {
      return fn(...args.map(arg => arg === _ ? null : arg))
    } else {
      return function(...args2) {
        return curried(...args.map(arg => arg === _ ? args2.pop() : arg).concat(args2))
      }
    }
  }
}

const curriedMultiply = curry(multiply, 3)

const step1 = curriedMultiply(2, _, _)
const step2 = step1(3, _)
const result = step2(4)

console.log('Result:', result) // Result: 24