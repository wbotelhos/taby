# jQuery Taby - A Textarea Tabulator - http://wbotelhos.com/taby

jQuery Taby is a plugin to enable tabulation in textarea fields.

## License

The jQuery Taby is licensed under [The MIT License](http://www.opensource.org/licenses/mit-license.php)

## Version

	@version        0.1.0
	@since          2012.01.10
	@author         Washington Botelho
	@documentation  wbotelhos.com/taby
	@twitter        twitter.com/wbotelhos

## Required Files

	jquery.taby.min.js

## Default values

	backspace : true         // Enables removal (end to begin) of a whole tabulation.
	deleter   : true         // Enables removal (begin to end) of a whole tabulation.
	left      : true         // Enables jump tabulation using left arrow.
	right     : true         // Enables jump tabulation using right arrow.
	space     : 4            // Change the number of spaces given to tabulation.

## Usage with default values

	$('#area').taby();

	<textarea id="area"></textarea>

	$('.area').taby();

	<textarea class="area"></textarea>
	<textarea class="area"></textarea>
	<textarea class="area"></textarea>

## Public functions

	$('#area').taby('goTo', 10);          // Goes to position 10 of the text.

	$('#area').taby('select', 1, 10);     // Select the texto from postion 1 to 10.

	$('#area').taby('set', { space: 2 }); // Changes the dynamic properties specified.

## Buy me a coffee

You can do it by [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Taby). Thanks! (:

## Contributors

Daniel Faria
