(function($) {
	function scrollToContents() {
		$('html, body').animate({
			scrollTop: $("#table_of_contents").offset().top
		}, 500);
	}

	$(function() {
		$("#enter-button").click(function() {
			scrollToContents();
		});

	$(".collection-item").click(function(e) {
		element_id = $(this).attr('href');
		$(".collection").children().removeClass('chapter-active');
		$(".collection").children().removeClass('disabled');
		$(this).addClass('chapter-active');
		$(this).addClass('disabled');
		$(".toc-content").children().hide();
		$(element_id).show();
		e.preventDefault();
	});

	$(".card").hover(
		function() {
			$(this).addClass('z-depth-2');
			$(this).animate({
				backgroundColor: "#00838f"
			}, 250);
		}, function() {
			$(this).removeClass('z-depth-2');
			$(this).animate({
				backgroundColor: "#0097a7"
			}, 250);
		}
	);

	$(window).resize(function() {
		if ($("#main-background").height() < 650) {
			$("#down-arrow-row").hide();
		} else {
			$("#down-arrow-row").show();
		}	

		if ($("#main-background").width() < 650) {
			$("#issue-title").hide();
		} else {
			$("#issue-title").show();
		}	


	});
	// 	var options = [
	// 		{selector: '#index-banner', offset: 0,
	// 		callback: "scrollToContents()"}
	// 	];
	// 	Materialize.scrollFire(options);
	});
})(jQuery);
