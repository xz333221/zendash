# zendash

A library of common tool methods, including functions for generating random IDs, creating debounced functions, and formatting dates and times.

## Install

To install zendash, use npm:

```shell
npm install zendash
```

## Usage

You can use zendash with CommonJS or ES Modules.

### CommonJS

```js
const zendash = require('zendash');

// Generate an ID with a length of 8 characters
const id = zendash.generateId(8);

// Create a debounced function
const debouncedFunction = zendash.debounce(() => {
  console.log('Debounced!');
}, 300);

// Format the current date and time
const formattedTime = zendash.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');

// Format the current date only
const formattedDate = zendash.parseDate(new Date(), '{y}-{m}-{d}');
```

### ES Modules

```js
import { generateId, debounce, parseTime, parseDate } from 'zendash';

// Generate an ID with a length of 8 characters
const id = generateId(8);

// Create a debounced function
const debouncedFunction = debounce(() => {
  console.log('Debounced!');
}, 300);

// Format the current date and time
const formattedTime = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}');

// Format the current date only
const formattedDate = parseDate(new Date(), '{y}-{m}-{d}');
```

## API

### `generateId(length = 8, onlyNumber = false)`

Generates a random ID of specified length. Optionally, the ID can consist only of numbers.

- **`length`** (number): The length of the ID to generate. Default is 8.
- **`onlyNumber`** (boolean): Whether the ID should contain only numbers. Default is `false`.
- **Returns**: A randomly generated ID string.

### `debounce(func, wait = 300)`

Creates a debounced version of the provided function, which delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked.

- **`func`** (function): The function to debounce.
- **`wait`** (number): The number of milliseconds to delay. Default is 300.
- **Returns**: A debounced function.

### `parseTime(time, cFormat = '{y}-{m}-{d} {h}:{i}:{s}', isLocalTime = true)`

Formats the provided time into a specified string format.

- **`time`** (Date|string|number|null): The time to format. Can be a Date object, a timestamp (string or number), or `null` to use the current time.
- **`cFormat`** (string): The format template. Default is `'{y}-{m}-{d} {h}:{i}:{s}'`.
- **`isLocalTime`** (boolean): Whether to use local time for formatting. Default is `true`. If `false`, UTC time is used.
- **Returns**: A formatted time string.

### `parseDate(time, cFormat = '{y}-{m}-{d}', isLocalTime = true)`

Formats the provided time into a specified date format (without time).

- **`time`** (Date|string|number|null): The time to format. Can be a Date object, a timestamp (string or number), or `null` to use the current date.
- **`cFormat`** (string): The format template. Default is `'{y}-{m}-{d}'`.
- **`isLocalTime`** (boolean): Whether to use local time for formatting. Default is `true`. If `false`, UTC time is used.
- **Returns**: A formatted date string.

---

This README now includes descriptions and usage examples for each function in your library, making it easier for users to understand how to use them effectively.
