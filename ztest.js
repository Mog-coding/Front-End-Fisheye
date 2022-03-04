var focusableEls = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
var firstFocusableEl = focusableEls[0];
var lastFocusableEl = focusableEls[focusableEls.length -1];

var KEYCODE_TAB = 9;

element.addEventListener('keydown', function(e) {
  if (e.key === 'Tab' || e.keyCode === KEYCODE_TAB) {
    if ( e.shiftKey ) /* shift + tab */ {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus( );
        e.preventDefault( );
      }
    } else /* tab */ {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus( );
        e.preventDefault( );
      }    }  }
});