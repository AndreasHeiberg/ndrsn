var s,
Deck = {

	settings: {
		wrapper: $('#deck'),
		numArticles: 5,
		articleList: $("#article-list"),
		moreButton: $("#more-button")
	},

	init: function(wrapper) {
		s = this.settings;
		s.wrapper = $(wrapper);

		$(window).resize(this.setHeight);
		this.setHeight();

		s.wrapper.find('a[href*=#]').on('click', function(event) {
			event.preventDefault();
			Deck.goToSlide($(this).attr('href'));
		});
	},

	setHeight: function() {
		s.wrapper.css('height', $(window).height());
	},

	goToSlide: function(id) {
		var $element = $(id),
			destination = $element.offset().top;

			$("body").animate({  scrollTop: destination}, 400);
	}
};