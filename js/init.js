(function($){

$(".parallax").parallax();
$(".toc-content").children().hide();

var pathArray = window.location.href.split( '/' );
var plast = pathArray.length - 1;

if (pathArray[plast] == "") {
	plast = plast - 1;
}

if ((pathArray.length > 3) && (pathArray[plast].indexOf("#") == 0) && (pathArray[plast] != "#")) {
//	window.location.href = "#table-of-contents";
	$('link[type*=icon]').detach().appendTo('head');

	if (pathArray[plast] == "#table-of-contents") {
		pathArray[plast] = "#announcements";
	}

	$(pathArray[plast]).show();
	$('.toc a[href=' + pathArray[plast] + ']').addClass("chapter-active");
	$('.toc a[href=' + pathArray[plast] + ']').addClass("disabled");

	if(pathArray[plast] != "#announcements") {
		var mini_name = pathArray[plast] + "-mini";
		$(mini_name).addClass("active");
		$(mini_name).children().first().addClass("active");

		if($(mini_name).is(':visible')) {
			window.location.href = "#table-of-contents";
		}
	}
} else {
	$("#announcements").show();
	$('.toc a[href=' + "#announcements" + ']').addClass("chapter-active");
        $('.toc a[href=' + "#announcements" + ']').addClass("disabled");
	// if mobile, no need to expand letter from the editor
}

$(function(){

}); // end of document ready

})(jQuery); // end of jQuery name space
