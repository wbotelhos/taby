describe('Using Tab', function() {

	beforeEach(function() {
		$('<textarea id="target" cols="40" rows="7"></textarea>').appendTo('body').val('12345\n789\n12345\n789');
	});

	afterEach(function() {
		$('#target').remove();
	});

	it ('should tabulate on begin', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 0;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
	    expect($this).toHaveValue(tab + '12345\n789\n12345\n789');
	    expect($this[0].selectionStart).toEqual(0 + tab.length);
	    expect($this[0].selectionEnd).toEqual(0 + tab.length);
	});

	it ('should tabulate on middle', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 1;
		$this[0].selectionEnd = 1;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
	    expect($this).toHaveValue('1' + tab + '2345\n789\n12345\n789');
	    expect($this[0].selectionStart).toEqual(1 + tab.length);
	    expect($this[0].selectionEnd).toEqual(1 + tab.length);
	});

	it ('should tabulate on end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 19;
		$this[0].selectionEnd = 19;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
	    expect($this).toHaveValue('12345\n789\n12345\n789' + tab);
	    expect($this[0].selectionStart).toEqual(19 + tab.length);
	    expect($this[0].selectionEnd).toEqual(19 + tab.length);
	});

	it ('should not select the tabulation when the start is the same of the end', function() {
		// given
		var $this	= $('#target').taby().val('\n789\n12345\n789'),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 0;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
	    expect($this).toHaveValue(tab + '\n789\n12345\n789');
	    expect($this[0].selectionStart).toEqual(0 + tab.length);
	    expect($this[0].selectionEnd).toEqual(0 + tab.length);
	});

});

describe('Using Single Line Tab Selection', function() {

	beforeEach(function() {
		$('<textarea id="target" cols="40" rows="7"></textarea>').appendTo('body').val('12345\n789\n12345\n789');
	});

	afterEach(function() {
		$('#target').remove();
	});

	it ('should tabulate cutting selection from begin to middle on first line', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 3;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
		expect($this).toHaveValue(tab + '45\n789\n12345\n789');
		expect($this[0].selectionStart).toEqual(0 + tab.length);
		expect($this[0].selectionEnd).toEqual(0 + tab.length);
	});

	it ('should tabulate cutting selection from middle to end on first line', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 3;
		$this[0].selectionEnd = 5;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
	    expect($this).toHaveValue('123' + tab + '\n789\n12345\n789');
	    expect($this[0].selectionStart).toEqual(3 + tab.length);
	    expect($this[0].selectionEnd).toEqual(3 + tab.length);
	});

	it ('should tabulate selection from begin to end on first line', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 5;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
	    expect($this).toHaveValue(tab + '12345\n789\n12345\n789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(5 + tab.length);
	});

	it ('should tabulate selection from begin to end on second line', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 6;
		$this[0].selectionEnd = 9;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
	    expect($this).toHaveValue('12345\n' + tab + '789\n12345\n789');
	    expect($this[0].selectionStart).toEqual(6);
	    expect($this[0].selectionEnd).toEqual(9 + tab.length);
	});

});

describe('Using Multiple Line Tab Selection', function() {

	beforeEach(function() {
		$('<textarea id="target" cols="40" rows="7"></textarea>').appendTo('body').val('12345\n789\n12345\n789');
	});

	afterEach(function() {
		$('#target').remove();
	});

	it ('should tabulate the first and second line from begin to middle', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 7;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
	    expect($this).toHaveValue(tab + '12345\n' + tab + '789\n12345\n789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(7 + (2 * tab.length));
	});

	it ('should tabulate the first and second line from begin to end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 8;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
	    expect($this).toHaveValue(tab + '12345\n' + tab + '789\n12345\n789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(8 + (2 * tab.length));
	});

	it ('should tabulate the first and second line from begin to end with breakline', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 9;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
	    expect($this).toHaveValue(tab + '12345\n' + tab + '789\n12345\n789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(9 + (2 * tab.length));
	});

	it ('should tabulate the first and second line from middle to end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 1;
		$this[0].selectionEnd = 8;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
		expect($this).toHaveValue(tab + '12345\n' + tab + '789\n12345\n789');
		expect($this[0].selectionStart).toEqual(1 + tab.length);
	    expect($this[0].selectionEnd).toEqual(8 + (2 * tab.length));
	});

	it ('should tabulate the first and second line from middle to middle', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 1;
		$this[0].selectionEnd = 7;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
		expect($this).toHaveValue(tab + '12345\n' + tab + '789\n12345\n789');
		expect($this[0].selectionStart).toEqual(1 + tab.length);
	    expect($this[0].selectionEnd).toEqual(7 + (2 * tab.length));
	});

	it ('should tabulate all lines', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = $this[0].value.length;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
	    expect($this).toHaveValue(tab + '12345\n' + tab + '789\n' + tab + '12345\n' + tab + '789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual($this[0].value.length);
	});

});

describe('Using Shift + Tab', function() {

	beforeEach(function() {
		$('<textarea id="target" cols="40" rows="7"></textarea>').appendTo('body').val('    12345\n    789\n    12345\n    789');
	});

	afterEach(function() {
		$('#target').remove();
	});

	it ('should tabulate the first line with cursor on begin of the text with 1 tab before', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 4;
		$this[0].selectionEnd = 4;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(4 - tab.length);
	    expect($this[0].selectionEnd).toEqual(4 - tab.length);
	});

	it ('should tabulate the first line with cursor on begin of the text with 2 tabs before', function() {
		// given
		var $this	= $('#target').taby().val('        12345\n    789\n    12345\n    789'),
			tab		= '    ';

		$this[0].selectionStart = 8;
		$this[0].selectionEnd = 8;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('    12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(8 - tab.length);
	    expect($this[0].selectionEnd).toEqual(8 - tab.length);
	});

	it ('should tabulate the second line with cursor on begin of the line with 1 tab after', function() {
		// given
		var $this	= $('#target').taby();

		$this[0].selectionStart = 10;
		$this[0].selectionEnd = 10;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('    12345\n789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(10);
	    expect($this[0].selectionEnd).toEqual(10);
	});

	it ('should tabulate the second line with cursor on middle of the tab with 1 tab before the text', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 12;
		$this[0].selectionEnd = 12;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('    12345\n789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(10);
	    expect($this[0].selectionEnd).toEqual(10);
	});

	it ('should not tabulate the second line when there is no tab on it', function() {
		// given
		var $this = $('#target').taby().val('    12345\n 789\n    12345\n    789');

		$this[0].selectionStart = 11;
		$this[0].selectionEnd = 11;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('    12345\n 789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(11);
	    expect($this[0].selectionEnd).toEqual(11);
	});

	it ('should tabulate the second line with cursor on the middle of the text with 1 tab before', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 15;
		$this[0].selectionEnd = 15;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('    12345\n789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(15 - tab.length);
	    expect($this[0].selectionEnd).toEqual(15 - tab.length);
	});

	it ('should untabulate tabs inside the text', function() {
		// given
		var $this = $('#target').taby().val('12345    12345\n    789\n    12345\n    789');

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 0;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345    12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(0);
	});

});

describe('Using Shift + Tab Selection', function() {

	beforeEach(function() {
		$('<textarea id="target" cols="40" rows="7"></textarea>').appendTo('body').val('    12345\n    789\n    12345\n    789');
	});

	afterEach(function() {
		$('#target').remove();
	});

	it ('should tabulate selection on the first line with cursor from begin to end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 9;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(9 - tab.length);
	});

	it ('should tabulate selection on the first line with cursor from begin to middle', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 8;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(8 - tab.length);
	});

	it ('should tabulate selection on the first line with cursor from middle to end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 1;
		$this[0].selectionEnd = 9;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(9 - tab.length);
	});

	it ('should tabulate selection on the first line with cursor from middle to middle', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 1;
		$this[0].selectionEnd = 8;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(8 - tab.length);
	});

	it ('should tabulate selection on the first line with cursor from begin to end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 9;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(9 - tab.length);
	});

	it ('should tabulate selection on the first line with cursor from begin to middle', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 8;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(8 - tab.length);
	});

	it ('should tabulate selection on the first line with cursor from middle to end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 1;
		$this[0].selectionEnd = 9;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(9 - tab.length);
	});

	it ('should tabulate selection on the first line with cursor from middle to middle', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 1;
		$this[0].selectionEnd = 8;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(8 - tab.length);
	});

	it ('should tabulate selection on the third line with cursor from begin to end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 18;
		$this[0].selectionEnd = 27;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('    12345\n    789\n12345\n    789');
	    expect($this[0].selectionStart).toEqual(18);
	    expect($this[0].selectionEnd).toEqual(27 - tab.length);
	});

	it ('should tabulate selection on the third line with cursor from begin to middle', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 18;
		$this[0].selectionEnd = 28;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('    12345\n    789\n12345\n    789');
	    expect($this[0].selectionStart).toEqual(18);
	    expect($this[0].selectionEnd).toEqual(28 - tab.length);
	});

	it ('should tabulate selection on the third line with cursor from middle to end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 19;
		$this[0].selectionEnd = 27;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('    12345\n    789\n12345\n    789');
	    expect($this[0].selectionStart).toEqual(18);
	    expect($this[0].selectionEnd).toEqual(27 - tab.length);
	});

	it ('should tabulate selection on the third line with cursor from middle to middle', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 19;
		$this[0].selectionEnd = 26;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('    12345\n    789\n12345\n    789');
	    expect($this[0].selectionStart).toEqual(18);
	    expect($this[0].selectionEnd).toEqual(26 - tab.length);
	});

});


describe('Using Shift + Tab Multiple Selection', function() {

	beforeEach(function() {
		$('<textarea id="target" cols="40" rows="7"></textarea>').appendTo('body').val('    12345\n    789\n    12345\n    789');
	});

	afterEach(function() {
		$('#target').remove();
	});

	it ('should tabulate the first and second line with cursors from begin to end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 17;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(17 - (2 * tab.length));
	});

	it ('should tabulate the first and second line with cursors from begin to middle', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 16;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(16 - (2 * tab.length));
	});

	it ('should tabulate the first and second line with cursors from middle to end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 1;
		$this[0].selectionEnd = 17;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(17 - (2 * tab.length));
	});

	it ('should tabulate the first and second line with cursors from middle to middle', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 1;
		$this[0].selectionEnd = 16;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(16 - (2 * tab.length));
	});

	it ('should tabulate the first and second line with cursors from begin to end + next breakline', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 18;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(18 - (2 * tab.length));
	});

	it ('should tabulate the second and third line with cursors from breakline of the previous line to end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 9;
		$this[0].selectionEnd = 17;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('12345\n789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(9 - tab.length); // first line
	    expect($this[0].selectionEnd).toEqual(17 - (2 * tab.length));
	});

	it ('should tabulate the second and third line with cursors from begin to end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 10;
		$this[0].selectionEnd = 27;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('    12345\n789\n12345\n    789');
	    expect($this[0].selectionStart).toEqual(10);
	    expect($this[0].selectionEnd).toEqual(27 - (2 * tab.length));
	});

	it ('should tabulate the second and third line with cursors from begin to middle', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 10;
		$this[0].selectionEnd = 26;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('    12345\n789\n12345\n    789');
	    expect($this[0].selectionStart).toEqual(10);
	    expect($this[0].selectionEnd).toEqual(26 - (2 * tab.length));
	});

	it ('should tabulate the second and third line with cursors from middle to end', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 11;
		$this[0].selectionEnd = 27;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('    12345\n789\n12345\n    789');
	    expect($this[0].selectionStart).toEqual(10);
	    expect($this[0].selectionEnd).toEqual(27 - (2 * tab.length));
	});

	it ('should tabulate the second and third line with cursors from middle to middle', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 11;
		$this[0].selectionEnd = 26;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9, shiftKey: true });

		// then
		expect($this).toHaveValue('    12345\n789\n12345\n    789');
	    expect($this[0].selectionStart).toEqual(10);
	    expect($this[0].selectionEnd).toEqual(26 - (2 * tab.length));
	});

});

describe('Using Delete', function() {

	beforeEach(function() {
		$('<textarea id="target" cols="40" rows="7"></textarea>').appendTo('body').val('    12345\n    789\n    12345\n    789');
	});

	afterEach(function() {
		$('#target').remove();
	});

	it ('should delete tabulation when has 1 tab behind', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 0;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 46, keyCode: 46 });

		// then
		expect($this).toHaveValue('12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(0);
	});

	/* TODO how to simulate the real action?
	it ('should not delete all tabulation when has 1 tab ahead but delete is disabled', function() {
		// given
		var $this = $('#target').taby({ deleter: false });

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 0;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 46, keyCode: 46 });

		// then
		expect($this).toHaveValue('   12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(0);
	});
	*/

	/* TODO how to simulate the real action?
	it ('should not delete tabulation when has no 1 tab behind', function() {
		// given
		var $this = $('#target').taby().html('   1');

		$this[0].selectionStart = 1;
		$this[0].selectionEnd = 1;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 46, keyCode: 46 });

		// then
		expect($this).toHaveValue('    12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(1);
	    expect($this[0].selectionEnd).toEqual(1);
	});
	*/

});

describe('Using Backspace', function() {

	beforeEach(function() {
		$('<textarea id="target" cols="40" rows="7"></textarea>').appendTo('body').val('    12345\n    789\n    12345\n    789');
	});

	afterEach(function() {
		$('#target').remove();
	});

	it ('should delete when has 1 tab behind', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 4;
		$this[0].selectionEnd = 4;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 8, keyCode: 8 });

		// then
		expect($this).toHaveValue('12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(0);
	});

	/* TODO how to simulate the real action?
	it ('should not delete all tabulation when has 1 tab behind but backspace is disabled', function() {
		// given
		var $this = $('#target').taby({ backspace: false });

		$this[0].selectionStart = 4;
		$this[0].selectionEnd = 4;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 8, keyCode: 8 });

		// then
		expect($this).toHaveValue('   12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(4);
	    expect($this[0].selectionEnd).toEqual(4);
	});
	*/

	/* TODO how to simulate the real action?
	it ('should not delete tabulation when has no 1 tab behind', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 3;
		$this[0].selectionEnd = 3;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 8, keyCode: 8 });

		// then
		expect($this).toHaveValue('    12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(3);
	    expect($this[0].selectionEnd).toEqual(3);
	});
	*/

});

describe('Using Left Arrow', function() {

	beforeEach(function() {
		$('<textarea id="target" cols="40" rows="7"></textarea>').appendTo('body').val('        12345\n    789\n    12345\n    789');
	});

	afterEach(function() {
		$('#target').remove();
	});

	it ('should jump tabulate when has 1 tab behind', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 4;
		$this[0].selectionEnd = 4;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 37, keyCode: 37 });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(0);
	});

	it ('should jump tabulate with selection when has 1 tab behind', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 4;
		$this[0].selectionEnd = 4;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 37, keyCode: 37, shiftKey: true });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(4);
	});

	it ('should jump tabulate with selection when has 1 tab ahead and 1 behind selected', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 4;
		$this[0].selectionEnd = 8;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 37, keyCode: 37, shiftKey: true });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(8);
	});

	it ('should unselect and jump tabulate when has 1 tab behind', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 4;
		$this[0].selectionEnd = 8;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 37, keyCode: 37 });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(4);
	    expect($this[0].selectionEnd).toEqual(4);
	});

	/* TODO how to simulate the real action?
	it ('should ignore tabulation hein metaKey is down (cmd)', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 8;
		$this[0].selectionEnd = 8;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 37, keyCode: 37, metaKey: true });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(0);
	});
	*/

	/* TODO how to simulate the real action?
	it ('should not jump all tabulation when has 1 tab behind but left is disabled', function() {
		// given
		var $this = $('#target').taby({ left: false });

		$this[0].selectionStart = 4;
		$this[0].selectionEnd = 4;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 46, keyCode: 46 });

		// then
		expect($this).toHaveValue('    12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(3);
	    expect($this[0].selectionEnd).toEqual(3);
	});
	*/

	/* TODO how to simulate the real action?
	it ('should not jump when it is disabled', function() {
		// given
		var $this = $('#target').taby({ left: false });

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 0;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 39, keyCode: 39 });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(4);
	    expect($this[0].selectionEnd).toEqual(4);
	});
	*/

	/* TODO how to simulate the real action? 
	it ('should not jump tabulate when has no 1 tab behind', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 3;
		$this[0].selectionEnd = 3;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 37, keyCode: 37 });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(2);
	    expect($this[0].selectionEnd).toEqual(2);
	});
	*/

});

describe('Using Right Arrow', function() {

	beforeEach(function() {
		$('<textarea id="target" cols="40" rows="7"></textarea>').appendTo('body').val('        12345\n    789\n    12345\n    789');
	});

	afterEach(function() {
		$('#target').remove();
	});

	it ('should jump tabulate when has 1 tab ahead', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 0;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 39, keyCode: 39 });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(4);
	    expect($this[0].selectionEnd).toEqual(4);
	});

	it ('should jump tabulate with selection when has 1 tab ahead', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 0;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 39, keyCode: 39, shiftKey: true });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(4);
	});

	it ('should jump tabulate with selection when has 1 tab ahead and 1 behind selected', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 4;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 39, keyCode: 39, shiftKey: true });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0);
	    expect($this[0].selectionEnd).toEqual(8);
	});

	it ('should unselect and jump tabulate when has 1 tab ahead', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 4;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 39, keyCode: 39 });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(4);
	    expect($this[0].selectionEnd).toEqual(4);
	});

	/* TODO how to simulate the real action?
	it ('should ignore tabulation hein metaKey is down (cmd)', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 0;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 39, keyCode: 39, metaKey: true });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(13);
	    expect($this[0].selectionEnd).toEqual(13);
	});
	*/

	/* TODO how to simulate the real action?
	it ('should not jump when it is disabled', function() {
		// given
		var $this = $('#target').taby({ right: false });

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 0;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 39, keyCode: 39 });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(1);
	    expect($this[0].selectionEnd).toEqual(1);
	});
	*/

	/* TODO how to simulate the real action? 
	it ('should not jump tabulate when has no 1 tab ahead', function() {
		// given
		var $this = $('#target').taby();

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 0;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 39, keyCode: 39 });

		// then
		expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(1);
	    expect($this[0].selectionEnd).toEqual(1);
	});
	*/

});

describe('Using Generic', function() {

	beforeEach(function() {
		$('<textarea id="target" cols="40" rows="7"></textarea>').appendTo('body').val('12345\n    789\n    12345\n    789');
	});

	afterEach(function() {
		$('#target').remove();
	});

	it ('should not bind twice', function() {
		// given
		var $this	= $('#target').taby(),
			tab		= '    ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 0;

		// when
		$this.taby();

		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
	    expect($this).toHaveValue(tab + '12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0 + tab.length);
	    expect($this[0].selectionEnd).toEqual(0 + tab.length);
	});

	it ('should change the size of the tabulation', function() {
		// given
		var $this	= $('#target').taby({ space: 5 }),
			tab		= '     ';

		$this[0].selectionStart = 0;
		$this[0].selectionEnd = 0;

		// when
		$('#target').trigger({ type: (($.browser.mozilla) ? 'keypress' : 'keydown'), which: 9, keyCode: 9 });

		// then
	    expect($this).toHaveValue(tab + '12345\n    789\n    12345\n    789');
	    expect($this[0].selectionStart).toEqual(0 + tab.length);
	    expect($this[0].selectionEnd).toEqual(0 + tab.length);
	});

});

describe('Using Functions', function() {

	beforeEach(function() {
		$('<textarea id="target" cols="40" rows="7"></textarea>').appendTo('body').val('12345\n    789\n    12345\n    789');;
	});

	afterEach(function() {
		$('#target').remove();
	});

	it ('should go to a position', function() {
		// given
		var $this = $('#target').taby();

		// when
		$this.taby('goTo', 3);

		// then
	    expect($this[0].selectionStart).toEqual(3);
	    expect($this[0].selectionEnd).toEqual(3);
	});

	it ('should select a range', function() {
		// given
		var $this = $('#target').taby();

		// when
		$this.taby('select', 1, 3);

		// then
	    expect($this[0].selectionStart).toEqual(1);
	    expect($this[0].selectionEnd).toEqual(3);
	});

	it ('should select a range until the end with no end value', function() {
		// given
		var $this = $('#target').taby();

		// when
		$this.taby('select', 1);

		// then
	    expect($this[0].selectionStart).toEqual(1);
	    expect($this[0].selectionEnd).toEqual($this.val().length);
	});

});
