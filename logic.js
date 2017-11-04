$(document).ready(function(){
	//making sure our logic is connected
	console.log("we ready")
	

	//scrolling effect click function
	$("nav").find("a").click(function(e) {
	    e.preventDefault();
	    var section = $(this).attr("href");
	    $("html, body").animate({
	        scrollTop: $(section).offset().top
	    });
	});

});