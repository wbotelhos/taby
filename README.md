# jQuery Taby - A Textarea Tabulator - [wbotelhos.com/taby](http://wbotelhos.com/taby)

jQuery Taby is a plugin to enable tabulation in textarea fields.

## Version

```
@version        1.0.0
@since          2012.01.10
@author         Washington Botelho
@documentation  wbotelhos.com/taby
@twitter        twitter.com/wbotelhos
```

## Required Files

+ jquery.taby.js

## Options

```js
backspace : true  // Enables removal (end to begin) of a whole tabulation.
del       : true  // Enables removal (begin to end) of a whole tabulation.
left      : true  // Enables jump tabulation using left arrow.
right     : true  // Enables jump tabulation using right arrow.
space     : 4     // Change the number of spaces given to tabulation.
```

## Usage

```js
$('textarea').taby();
```

```html
<textarea></textarea>
```

## Functions

```js
$('textarea').taby('goTo', 10);          // Goes to position 10 of the text.
$('textarea').taby('select', 1, 10);     // Select the text from position 1 to 10.
$('textarea').taby('set', { space: 2 }); // Changes the dynamic properties specified.
```

## Contributors

Daniel Faria

## Licence

The MIT License

Copyright (c) 2012 Washington Botelho

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Donate

You can do it via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Taby). Thanks! (:
