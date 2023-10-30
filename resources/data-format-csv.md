# CSV Data

JSON is not the only data format that you can work with in JavaScript, but other data formats will almost certainly require that you use a library to work with the data.

For CSV data, I would recommend either the [csv-parser]() library, or the [Papa Parse](https://www.papaparse.com/) library.

## Using csv-parse

You can load the CSV parse library into a JS module by including the following a the top of the JS file:

```js
import * as csv from 'https://cdn.skypack.dev/csv-parse@5.5.0/sync.js';
```

Then, to use the library, you can do something like the following:

```js
const response = await fetch('/your/data/url.csv');
const text = await response.text();
const rows = csv.parse(text, {
  // For a complete list of available options,
  // see https://csv.js.org/parse/options/
  columns: true,
});

// To see what you get from the parser, you can
// output it to the console.
console.log(rows);
```

## Using PapaParse

You can include Papa Parse in your app by adding the following script tag to your HTML:

```html
<script src="https://unpkg.com/papaparse@5.3.2/papaparse.min.js"></script>
```

Note that unpkg is just one of the CDNs where you can get Papa Parse. It's available from a number of them (like [cdnjs](https://cdnjs.com/), [JSDelivr](https://www.jsdelivr.com/), etc.).

Check the [Papa Parse documentation](https://www.papaparse.com/docs) for comprehensive set of things you can do with the library, but generally speaking, if I'm loading a CSV file that has a header row, I'll use a code snippet like:

```js
const response = await fetch('/your/data/url.csv');
const text = await response.text();
const rows = Papa.parse(text, {
  // For a complete list of available options,
  // see https://www.papaparse.com/docs#config
  header: true,
});

// To see what you get from the parser, you can
// output it to the console.
console.log(rows);
```
