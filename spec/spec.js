function context(description, spec) {
  describe(description, spec);
};

function keyType() {
  var is_mozilla = /firefox/.test(navigator.userAgent.toLowerCase())
  return is_mozilla ? 'keypress' : 'keydown'
};

function textareaWith(value) {
  $('<textarea cols="40" rows="7"></textarea>').appendTo('body').val(value);
};

describe('Taby', function() {

  context('Without Selection', function() {
    beforeEach(function() {
      textareaWith("12345\n789\n12345\n789");
    });

    afterEach(function() {
      $('textarea').remove();
    });

    it ('tabulates with cursor on begin', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 0;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue(tab + '12345\n789\n12345\n789');
      expect($this[0].selectionStart).toEqual(0 + tab.length);
      expect($this[0].selectionEnd).toEqual(0 + tab.length);
    });

    it ('tabulates with cursor on middle', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 1;
      $this[0].selectionEnd   = 1;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue('1' + tab + '2345\n789\n12345\n789');
      expect($this[0].selectionStart).toEqual(1 + tab.length);
      expect($this[0].selectionEnd).toEqual(1 + tab.length);
    });

    it ('tabulates with cursor on end', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 19;
      $this[0].selectionEnd   = 19;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue('12345\n789\n12345\n789' + tab);
      expect($this[0].selectionStart).toEqual(19 + tab.length);
      expect($this[0].selectionEnd).toEqual(19 + tab.length);
    });

    it ('does not select the tabulation when the start is the same of the end', function() {
      // given
      var $this = $('textarea').taby().val('\n789\n12345\n789'),
          tab   = '    ';

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 0;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue(tab + '\n789\n12345\n789');
      expect($this[0].selectionStart).toEqual(0 + tab.length);
      expect($this[0].selectionEnd).toEqual(0 + tab.length);
    });
  });

  describe('Single Line Selection', function() {
    beforeEach(function() {
      textareaWith('12345\n789\n12345\n789');
    });

    afterEach(function() {
      $('textarea').remove();
    });

    it ('tabulates cutting selection from begin to middle on first line', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 3;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue(tab + '45\n789\n12345\n789');
      expect($this[0].selectionStart).toEqual(0 + tab.length);
      expect($this[0].selectionEnd).toEqual(0 + tab.length);
    });

    it ('tabulates cutting selection from middle to end on first line', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 3;
      $this[0].selectionEnd   = 5;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue('123' + tab + '\n789\n12345\n789');
      expect($this[0].selectionStart).toEqual(3 + tab.length);
      expect($this[0].selectionEnd).toEqual(3 + tab.length);
    });

    it ('tabulates selection from begin to end on first line', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 5;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue(tab + '12345\n789\n12345\n789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual(5 + tab.length);
    });

    it ('tabulates selection from begin to end on second line', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 6;
      $this[0].selectionEnd   = 9;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue('12345\n' + tab + '789\n12345\n789');
      expect($this[0].selectionStart).toEqual(6);
      expect($this[0].selectionEnd).toEqual(9 + tab.length);
    });
  });

  describe('Multiple Line Selection', function() {
    beforeEach(function() {
      textareaWith('12345\n789\n12345\n789');
    });

    afterEach(function() {
      $('textarea').remove();
    });

    it ('tabulates the first and second line from begin to middle', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 7;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue(tab + '12345\n' + tab + '789\n12345\n789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual(7 + (2 * tab.length));
    });

    it ('tabulates the first and second line from begin to end', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 8;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue(tab + '12345\n' + tab + '789\n12345\n789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual(8 + (2 * tab.length));
    });

    it ('tabulates the first and second line from begin to end with breakline', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 9;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue(tab + '12345\n' + tab + '789\n12345\n789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual(9 + (2 * tab.length));
    });

    it ('tabulates the first and second line from middle to end', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 1;
      $this[0].selectionEnd   = 8;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue(tab + '12345\n' + tab + '789\n12345\n789');
      expect($this[0].selectionStart).toEqual(1 + tab.length);
      expect($this[0].selectionEnd).toEqual(8 + (2 * tab.length));
    });

    it ('tabulates the first and second line from middle to middle', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 1;
      $this[0].selectionEnd   = 7;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue(tab + '12345\n' + tab + '789\n12345\n789');
      expect($this[0].selectionStart).toEqual(1 + tab.length);
      expect($this[0].selectionEnd).toEqual(7 + (2 * tab.length));
    });

    it ('tabulates all lines', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = $this[0].value.length;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue(tab + '12345\n' + tab + '789\n' + tab + '12345\n' + tab + '789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual($this[0].value.length);
    });
  });

  describe('Shift + Tab', function() {
    context('without line selection', function() {
      beforeEach(function() {
        textareaWith('    12345\n    789\n    12345\n    789');
      });

      afterEach(function() {
        $('textarea').remove();
      });

      it ('tabulates the first line with cursor on begin of the text with 1 tab before', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 4;
        $this[0].selectionEnd   = 4;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n    789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(4 - tab.length);
        expect($this[0].selectionEnd).toEqual(4 - tab.length);
      });

      it ('tabulates the first line with cursor on begin of the text with 2 tabs before', function() {
        // given
        var $this = $('textarea').taby().val('        12345\n    789\n    12345\n    789'),
            tab   = '    ';

        $this[0].selectionStart = 8;
        $this[0].selectionEnd   = 8;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('    12345\n    789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(8 - tab.length);
        expect($this[0].selectionEnd).toEqual(8 - tab.length);
      });

      it ('tabulates the second line with cursor on begin of the line with 1 tab after', function() {
        // given
        var $this = $('textarea').taby();

        $this[0].selectionStart = 10;
        $this[0].selectionEnd   = 10;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('    12345\n789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(10);
        expect($this[0].selectionEnd).toEqual(10);
      });

      it ('tabulates the second line with cursor on middle of the tab with 1 tab before the text', function() {
        // given
        var $this = $('textarea').taby();

        $this[0].selectionStart = 12;
        $this[0].selectionEnd   = 12;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('    12345\n789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(10);
        expect($this[0].selectionEnd).toEqual(10);
      });

      it ('does not tabulate the second line when there is no tab on it', function() {
        // given
        var $this = $('textarea').taby().val('    12345\n 789\n    12345\n    789');

        $this[0].selectionStart = 11;
        $this[0].selectionEnd   = 11;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('    12345\n 789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(11);
        expect($this[0].selectionEnd).toEqual(11);
      });

      it ('tabulates the second line with cursor on the middle of the text with 1 tab before', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 15;
        $this[0].selectionEnd   = 15;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('    12345\n789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(15 - tab.length);
        expect($this[0].selectionEnd).toEqual(15 - tab.length);
      });

      it ('untabulates tabs inside the text', function() {
        // given
        var $this = $('textarea').taby().val('12345    12345\n    789\n    12345\n    789');

        $this[0].selectionStart = 0;
        $this[0].selectionEnd   = 0;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345    12345\n    789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(0);
      });
    });

    context('with single line selection', function() {
      beforeEach(function() {
        textareaWith('    12345\n    789\n    12345\n    789');
      });

      afterEach(function() {
        $('textarea').remove();
      });

      it ('tabulates the first line with cursor from begin to end', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 0;
        $this[0].selectionEnd   = 9;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n    789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(9 - tab.length);
      });

      it ('tabulates the first line with cursor from begin to middle', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 0;
        $this[0].selectionEnd   = 8;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n    789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(8 - tab.length);
      });

      it ('tabulates the first line with cursor from middle to end', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 1;
        $this[0].selectionEnd   = 9;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n    789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(9 - tab.length);
      });

      it ('tabulates the first line with cursor from middle to middle', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 1;
        $this[0].selectionEnd   = 8;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n    789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(8 - tab.length);
      });

      it ('tabulates the first line with cursor from begin to end', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 0;
        $this[0].selectionEnd   = 9;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n    789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(9 - tab.length);
      });

      it ('tabulates the first line with cursor from begin to middle', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 0;
        $this[0].selectionEnd   = 8;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n    789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(8 - tab.length);
      });

      it ('tabulates the first line with cursor from middle to end', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 1;
        $this[0].selectionEnd   = 9;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n    789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(9 - tab.length);
      });

      it ('tabulates the first line with cursor from middle to middle', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 1;
        $this[0].selectionEnd   = 8;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n    789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(8 - tab.length);
      });

      it ('tabulates the third line with cursor from begin to end', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 18;
        $this[0].selectionEnd   = 27;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('    12345\n    789\n12345\n    789');
        expect($this[0].selectionStart).toEqual(18);
        expect($this[0].selectionEnd).toEqual(27 - tab.length);
      });

      it ('tabulates the third line with cursor from begin to middle', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 18;
        $this[0].selectionEnd   = 28;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('    12345\n    789\n12345\n    789');
        expect($this[0].selectionStart).toEqual(18);
        expect($this[0].selectionEnd).toEqual(28 - tab.length);
      });

      it ('tabulates the third line with cursor from middle to end', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 19;
        $this[0].selectionEnd   = 27;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('    12345\n    789\n12345\n    789');
        expect($this[0].selectionStart).toEqual(18);
        expect($this[0].selectionEnd).toEqual(27 - tab.length);
      });

      it ('tabulates the third line with cursor from middle to middle', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 19;
        $this[0].selectionEnd   = 26;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('    12345\n    789\n12345\n    789');
        expect($this[0].selectionStart).toEqual(18);
        expect($this[0].selectionEnd).toEqual(26 - tab.length);
      });
    });

    context('with multiple line selection', function() {
      beforeEach(function() {
        textareaWith('    12345\n    789\n    12345\n    789');
      });

      afterEach(function() {
        $('textarea').remove();
      });

      it ('tabulates the first and second line with cursors from begin to end', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 0;
        $this[0].selectionEnd   = 17;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(17 - (2 * tab.length));
      });

      it ('tabulates the first and second line with cursors from begin to middle', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 0;
        $this[0].selectionEnd   = 16;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(16 - (2 * tab.length));
      });

      it ('tabulates the first and second line with cursors from middle to end', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 1;
        $this[0].selectionEnd   = 17;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(17 - (2 * tab.length));
      });

      it ('tabulates the first and second line with cursors from middle to middle', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 1;
        $this[0].selectionEnd   = 16;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(16 - (2 * tab.length));
      });

      it ('tabulates the first and second line with cursors from begin to end + next breakline', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 0;
        $this[0].selectionEnd   = 18;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(0);
        expect($this[0].selectionEnd).toEqual(18 - (2 * tab.length));
      });

      it ('tabulates the second and third line with cursors from breakline of the previous line to end', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 9;
        $this[0].selectionEnd   = 17;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('12345\n789\n    12345\n    789');
        expect($this[0].selectionStart).toEqual(9 - tab.length); // first line
        expect($this[0].selectionEnd).toEqual(17 - (2 * tab.length));
      });

      it ('tabulates the second and third line with cursors from begin to end', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 10;
        $this[0].selectionEnd   = 27;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('    12345\n789\n12345\n    789');
        expect($this[0].selectionStart).toEqual(10);
        expect($this[0].selectionEnd).toEqual(27 - (2 * tab.length));
      });

      it ('tabulates the second and third line with cursors from begin to middle', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 10;
        $this[0].selectionEnd   = 26;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('    12345\n789\n12345\n    789');
        expect($this[0].selectionStart).toEqual(10);
        expect($this[0].selectionEnd).toEqual(26 - (2 * tab.length));
      });

      it ('tabulates the second and third line with cursors from middle to end', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 11;
        $this[0].selectionEnd   = 27;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('    12345\n789\n12345\n    789');
        expect($this[0].selectionStart).toEqual(10);
        expect($this[0].selectionEnd).toEqual(27 - (2 * tab.length));
      });

      it ('tabulates the second and third line with cursors from middle to middle', function() {
        // given
        var $this = $('textarea').taby(),
            tab   = '    ';

        $this[0].selectionStart = 11;
        $this[0].selectionEnd   = 26;

        // when
        $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9, shiftKey: true });

        // then
        expect($this).toHaveValue('    12345\n789\n12345\n    789');
        expect($this[0].selectionStart).toEqual(10);
        expect($this[0].selectionEnd).toEqual(26 - (2 * tab.length));
      });
    });
  });

  describe('Delete', function() {
    beforeEach(function() {
      textareaWith('    12345\n    789\n    12345\n    789');
    });

    afterEach(function() {
      $('textarea').remove();
    });

    it ('deletes tabulation when has 1 tab behind', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 0;

      // when
      $('textarea').trigger({ type: keyType(), which: 46, keyCode: 46 });

      // then
      expect($this).toHaveValue('12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual(0);
    });

    /* TODO how to simulate the real action?
    it ('does not delete all tabulation when has 1 tab ahead but delete is disabled', function() {
      // given
      var $this = $('textarea').taby({ del: false });

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 0;

      // when
      $('textarea').trigger({ type: keyType(), which: 46, keyCode: 46 });

      // then
      expect($this).toHaveValue('   12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual(0);
    });
    */

    /* TODO how to simulate the real action?
    it ('does not delete tabulation when has no 1 tab behind', function() {
      // given
      var $this = $('textarea').taby().html('   1');

      $this[0].selectionStart = 1;
      $this[0].selectionEnd   = 1;

      // when
      $('textarea').trigger({ type: keyType(), which: 46, keyCode: 46 });

      // then
      expect($this).toHaveValue('    12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(1);
      expect($this[0].selectionEnd).toEqual(1);
    });
    */

  });

  describe('Backspace', function() {
    beforeEach(function() {
      textareaWith('    12345\n    789\n    12345\n    789');
    });

    afterEach(function() {
      $('textarea').remove();
    });

    it ('deletes when has 1 tab behind', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 4;
      $this[0].selectionEnd   = 4;

      // when
      $('textarea').trigger({ type: keyType(), which: 8, keyCode: 8 });

      // then
      expect($this).toHaveValue('12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual(0);
    });

    /* TODO how to simulate the real action?
    it ('does not delete all tabulation when has 1 tab behind but backspace is disabled', function() {
      // given
      var $this = $('textarea').taby({ backspace: false });

      $this[0].selectionStart = 4;
      $this[0].selectionEnd   = 4;

      // when
      $('textarea').trigger({ type: keyType(), which: 8, keyCode: 8 });

      // then
      expect($this).toHaveValue('   12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(4);
      expect($this[0].selectionEnd).toEqual(4);
    });
    */

    /* TODO how to simulate the real action?
    it ('does not delete tabulation when has no 1 tab behind', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 3;
      $this[0].selectionEnd   = 3;

      // when
      $('textarea').trigger({ type: keyType(), which: 8, keyCode: 8 });

      // then
      expect($this).toHaveValue('    12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(3);
      expect($this[0].selectionEnd).toEqual(3);
    });
    */

  });

  describe('Left Arrow', function() {
    beforeEach(function() {
      textareaWith('        12345\n    789\n    12345\n    789');
    });

    afterEach(function() {
      $('textarea').remove();
    });

    it ('jumps tabulate when has 1 tab behind', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 4;
      $this[0].selectionEnd   = 4;

      // when
      $('textarea').trigger({ type: keyType(), which: 37, keyCode: 37 });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual(0);
    });

    it ('jumps tabulate with selection when has 1 tab behind', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 4;
      $this[0].selectionEnd   = 4;

      // when
      $('textarea').trigger({ type: keyType(), which: 37, keyCode: 37, shiftKey: true });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual(4);
    });

    it ('jumps tabulate with selection when has 1 tab ahead and 1 behind selected', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 4;
      $this[0].selectionEnd   = 8;

      // when
      $('textarea').trigger({ type: keyType(), which: 37, keyCode: 37, shiftKey: true });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual(8);
    });

    it ('unselects and jump tabulate when has 1 tab behind', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 4;
      $this[0].selectionEnd   = 8;

      // when
      $('textarea').trigger({ type: keyType(), which: 37, keyCode: 37 });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(4);
      expect($this[0].selectionEnd).toEqual(4);
    });

    /* TODO how to simulate the real action?
    it ('ignores tabulation hein metaKey is down (cmd)', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 8;
      $this[0].selectionEnd   = 8;

      // when
      $('textarea').trigger({ type: keyType(), which: 37, keyCode: 37, metaKey: true });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual(0);
    });
    */

    /* TODO how to simulate the real action?
    it ('does not jump all tabulation when has 1 tab behind but left is disabled', function() {
      // given
      var $this = $('textarea').taby({ left: false });

      $this[0].selectionStart = 4;
      $this[0].selectionEnd   = 4;

      // when
      $('textarea').trigger({ type: keyType(), which: 46, keyCode: 46 });

      // then
      expect($this).toHaveValue('    12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(3);
      expect($this[0].selectionEnd).toEqual(3);
    });
    */

    /* TODO how to simulate the real action?
    it ('does not jump when it is disabled', function() {
      // given
      var $this = $('textarea').taby({ left: false });

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 0;

      // when
      $('textarea').trigger({ type: keyType(), which: 39, keyCode: 39 });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(4);
      expect($this[0].selectionEnd).toEqual(4);
    });
    */

    /* TODO how to simulate the real action?
    it ('does not jump tabulate when has no 1 tab behind', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 3;
      $this[0].selectionEnd   = 3;

      // when
      $('textarea').trigger({ type: keyType(), which: 37, keyCode: 37 });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(2);
      expect($this[0].selectionEnd).toEqual(2);
    });
    */

  });

  describe('Right Arrow', function() {
    beforeEach(function() {
      textareaWith('        12345\n    789\n    12345\n    789');
    });

    afterEach(function() {
      $('textarea').remove();
    });

    it ('jumps tabulate when has 1 tab ahead', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 0;

      // when
      $('textarea').trigger({ type: keyType(), which: 39, keyCode: 39 });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(4);
      expect($this[0].selectionEnd).toEqual(4);
    });

    it ('jumps tabulate with selection when has 1 tab ahead', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 0;

      // when
      $('textarea').trigger({ type: keyType(), which: 39, keyCode: 39, shiftKey: true });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual(4);
    });

    it ('jumps tabulate with selection when has 1 tab ahead and 1 behind selected', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 4;

      // when
      $('textarea').trigger({ type: keyType(), which: 39, keyCode: 39, shiftKey: true });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(0);
      expect($this[0].selectionEnd).toEqual(8);
    });

    it ('unselects and jump tabulate when has 1 tab ahead', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 4;

      // when
      $('textarea').trigger({ type: keyType(), which: 39, keyCode: 39 });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(4);
      expect($this[0].selectionEnd).toEqual(4);
    });

    /* TODO how to simulate the real action?
    it ('ignores tabulation hein metaKey is down (cmd)', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 0;

      // when
      $('textarea').trigger({ type: keyType(), which: 39, keyCode: 39, metaKey: true });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(13);
      expect($this[0].selectionEnd).toEqual(13);
    });
    */

    /* TODO how to simulate the real action?
    it ('does not jump when it is disabled', function() {
      // given
      var $this = $('textarea').taby({ right: false });

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 0;

      // when
      $('textarea').trigger({ type: keyType(), which: 39, keyCode: 39 });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(1);
      expect($this[0].selectionEnd).toEqual(1);
    });
    */

    /* TODO how to simulate the real action?
    it ('does not jump tabulate when has no 1 tab ahead', function() {
      // given
      var $this = $('textarea').taby();

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 0;

      // when
      $('textarea').trigger({ type: keyType(), which: 39, keyCode: 39 });

      // then
      expect($this).toHaveValue('        12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(1);
      expect($this[0].selectionEnd).toEqual(1);
    });
    */
  });

  describe('Generic behavior', function() {
    beforeEach(function() {
      textareaWith('12345\n    789\n    12345\n    789');
    });

    afterEach(function() {
      $('textarea').remove();
    });

    it ('does not bind twice', function() {
      // given
      var $this = $('textarea').taby(),
          tab   = '    ';

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 0;

      // when
      $this.taby();

      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue(tab + '12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(0 + tab.length);
      expect($this[0].selectionEnd).toEqual(0 + tab.length);
    });

    it ('changes the size of the tabulation', function() {
      // given
      var $this = $('textarea').taby({ space: 5 }),
          tab   = '     ';

      $this[0].selectionStart = 0;
      $this[0].selectionEnd   = 0;

      // when
      $('textarea').trigger({ type: keyType(), which: 9, keyCode: 9 });

      // then
      expect($this).toHaveValue(tab + '12345\n    789\n    12345\n    789');
      expect($this[0].selectionStart).toEqual(0 + tab.length);
      expect($this[0].selectionEnd).toEqual(0 + tab.length);
    });

  });

  describe('Functions', function() {
    beforeEach(function() {
      textareaWith('12345\n    789\n    12345\n    789');;
    });

    afterEach(function() {
      $('textarea').remove();
    });

    it ('goes to a position', function() {
      // given
      var $this = $('textarea').taby();

      // when
      $this.taby('goTo', 3);

      // then
      expect($this[0].selectionStart).toEqual(3);
      expect($this[0].selectionEnd).toEqual(3);
    });

    it ('selects a range', function() {
      // given
      var $this = $('textarea').taby();

      // when
      $this.taby('select', 1, 3);

      // then
      expect($this[0].selectionStart).toEqual(1);
      expect($this[0].selectionEnd).toEqual(3);
    });

    it ('selects a range until the end with no end value', function() {
      // given
      var $this = $('textarea').taby();

      // when
      $this.taby('select', 1);

      // then
      expect($this[0].selectionStart).toEqual(1);
      expect($this[0].selectionEnd).toEqual($this.val().length);
    });
  });
});
