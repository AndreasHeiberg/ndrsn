var s,
Deck = {

	settings: {
		wrapper: $('#deck'),
		slides: [],
		currentSlide: 0,
		scrollable: $('html, body')
	},

	init: function(wrapper) {
		s = this.settings;
		s.wrapper = $(wrapper);

		$(window).resize(this.setHeight);
		Deck.setHeight();

		// $(window).scroll(function(event) {
		// 	Deck.goToNearestSlide();
		// 	// clearTimeout($.data(this, "scrollTimer"));
		// 	// $.data(this, "scrollTimer", setTimeout(function() {
		// 	// 	Deck.goToNearestSlide();
		// 	// }, 250));
		// });


		var lastScrollTop = 0;
		$(window).scroll(function(event) {
			event.preventDefault();

			var st = $(this).scrollTop();

			if (st > lastScrollTop && st > 0 && st < $(window).height()) {
				Deck.next();
			}
			else if (st < lastScrollTop && st > 0 && st < $(window).height()) {
				Deck.previous();
			}

			lastScrollTop = st;
		});

		s.wrapper.find('a[href*=#]').on('click', function(event) {
			event.preventDefault();
			Deck.goToSlide($(this).attr('href'));
		});

		s.slides = s.wrapper.find('.slide');
	},

	setHeight: function() {
		s.wrapper.css('height', $(window).height());
	},

	// either pass the id of the slide or it's index
	goToSlide: function(slide) {
		if (typeof(slide) === "string") {
			var $element = $(slide);
		}
		else {
			var $element = $(s.slides[slide]);
		}

		var destination = $element.offset().top;

		$("body").filter(':not(:animated)').animate({  scrollTop: destination}, 400, 'swing', function() {});
	},

	goToNearestSlide: function() {
		var currentSlide = Deck.current();

		Deck.goToSlide(currentSlide);
	},

	next: function() {
		var currentSlide = Deck.current();
		var nextSlide = currentSlide === s.slides.length - 1 ? currentSlide : currentSlide + 1;

		Deck.goToSlide(nextSlide);
	},

	previous: function() {
		var currentSlide = Deck.current();
		var previousSlide = currentSlide === 0 ? currentSlide : currentSlide - 1;

		Deck.goToSlide(previousSlide);
	},

	current: function() {
		var scrollTop = window.pageYOffset;
		var newIndex;
		var minDistance;

		s.slides.each(function(index, element) {
			var distance = Math.abs($(element).offset().top - scrollTop);
			if (index == 0)
			{
				newIndex = 0;
				minDistance = distance;
			}
			else if (distance < minDistance)
			{
				newIndex = index;
				minDistance = distance;
			}
		});

		return newIndex;
	}
};