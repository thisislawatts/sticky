;/**
 *
 *
 *
 *
 *  Example Usage:
 *  <div data-sticky></div>
 *  <div data-sticky data-sticky-full-width></div>
 *
 *  Requires Modernizr
 */
(function( $, Modernizr, undefined ) {
	var Sticky = function ($el) {
		var _this = this;

		_this.options = {
			full_width: $el.data('sticky-full-width') === '',
			fixed: $el.data('sticky-fixed') === ''
		};

		_this.$el = $el;

		if ( window.innerWidth > 880 && !Modernizr.touch )
			_this.init();

		if (!window.Stickies) window.Stickies = [];

		Stickies.push( _this );

		return this;
	};

	Sticky.prototype.init = function() {
		var _this = this;

		_this.sticky_id = 'sticky-item-' + Math.round( Math.random() * 100 );
		_this.$wrap = $('<div id="'+ _this.sticky_id +'" class="sticky--wrapper"></div>');
		_this.$wrap.css( _this.getWrapperStyles() );

		_this.$el.wrap(this.$wrap);
		_this.offsetTop = _this.$el.offset().top;
		_this.triggerOffsetTop = _this.options.fixed ? 0 : _this.$el.offset().top;

		console.log("Options: ", _this.options);
		console.log("Offset Top: ", _this.offsetTop);
		_this.offsetLeft = this.$wrap.offset().left + this.$el.offset().left;
	};


	/* http://stackoverflow.com/questions/13382516/getting-scroll-bar-width-using-javascript */
	Sticky.prototype.getScrollbarWidth = function() {
	    var outer = document.createElement("div");
	    outer.style.visibility = "hidden";
	    outer.style.width = "100px";
	    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

	    document.body.appendChild(outer);

	    var widthNoScroll = outer.offsetWidth;
	    // force scrollbars
	    outer.style.overflow = "scroll";

	    // add innerdiv
	    var inner = document.createElement("div");
	    inner.style.width = "100%";
	    outer.appendChild( inner );

	    var widthWithScroll = inner.offsetWidth;

	    // remove divs
	    outer.parentNode.removeChild(outer);

	    return widthNoScroll - widthWithScroll;
	};

	Sticky.prototype.getWrapperStyles = function() {

		var _this = this,
			position = (_this.$el.css('position') === "absolute" ) ? 'absolute' : 'relative',
			styles = {};

		if ( position === 'absolute' ) {
			var arr = ['top', 'right', 'bottom', 'left'];
			for (var i = arr.length - 1; i >= 0; i--) {
				var prop = arr[i],
					val = _this.$el.css(prop);

				if ( val !== "auto" ) {
					styles[prop] = val;
				}
			}

			styles.width = _this.$el.outerWidth() + 5;
		}

		return $.extend({
			'height': ( _this.$el.outerHeight() + parseFloat( _this.$el.css('margin-bottom') ) ),
			'position': position,
			'width' : _this.$el.outerWidth()
		}, styles );
	};

	Sticky.prototype.getElementStyle = function() {

		var _this = this,
			styles = {
			'position': 'fixed',
			'top' : _this.options.fixed ? _this.offsetTop : 0,
			'width': _this.$el.outerWidth()
		};

		if ( _this.options.full_width ) {
			styles.width = window.innerWidth - _this.getScrollbarWidth();

		} else {
			styles = $.extend(styles, {
				'left': _this.offsetLeft,
			});
		}

		return styles;
	};

	Sticky.prototype.checkPosition = function( offset_y ) {
		var _this = this;
		console.log(_this.offsetTop, offset_y);
		if ( _this.triggerOffsetTop < offset_y ) {

			_this.$el.addClass('s__stuck').css(
				_this.getElementStyle() );

		} else {
			_this.$el.removeClass('s__stuck').css({
				'position': 'relative',
				'top' : 0,
				'left' : 0,
				'width': _this.$el.outerWidth()
			});
		}
	};

	$('[data-sticky]').each(function() {
		new Sticky( $(this) );
	});

	// We've got a cheeky wrapper element capturing scrolls
	//
	var $page = $('#page').length ? $('#page') : $(window);

	if ( window.Stickies ) {
		$page.on( 'scroll', function(evt) {
			var scrollTop = $page.scrollTop();
			for (var i = window.Stickies.length - 1; i >= 0; i--) {
				window.Stickies[i].checkPosition( scrollTop );
			}
		});
	}

	console.log("jquery.sticky.v2");
}( window.jQuery, window.Modernizr ) );
