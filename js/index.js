$(function($){
   $('a.nav').click(function() {
        var $this = $(this),
          _href = $this.attr('href'),
	    	  dest  = $(_href).offset().top;
            $("html:not(:animated),body:not(:animated)").animate({  scrollTop: dest}, 400 );
  	    return false;
    }); 
});
