/*
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
[ COMMON SCRIPTS ]

AUTHOR : NCode.Art
PROJECT NAME : NC-Hold Coming-Soon Page
VERSION : 0.01
++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
*/

(function($) {
	"use strict";

	$(window).load(function(){
		mainBg();
		loader();
	});

	$(document).ready(function() {
		navigation();
		owlCarouselWidget();
		pageTransation();
		textAnimation();
		notifyMeForm();
	});
	
	$(window).resize(function() {
		mainBg();
	});

})(jQuery);

/*	COLOUMN HEIGHT
----------------------------*/
function loader(){
    $(".page-loader-wrapper").fadeOut(800);
}


/*	MAIN-BACKGROUND
----------------------------*/
function mainBg(){
	var path = $(".single-image .background").attr("data-image");
	if($("body").hasClass("single-image")){
		$(".single-image .background").css({
			"background-image" : "url("+path+")"
		});	
	}else{
		return false;
	}
}

/*	OWL-CAROUSEL
----------------------------*/
function owlCarouselWidget(){
	function strtoArr(arr) {
		if (typeof(arr) == "string") {
			var t1 = arr.split('|');
			var t2 = [];
			$.each(t1, function(index, val) {
				var str = val;
				t2.push(str.split(','));
			});
			return t2;
		}else{
			return false;
		}
	}

	function dataCheck(val){
		return val && val == "true" ? true : false;
	}

	if ($(".carousel-widget").length > 0) {
		var carousel = 0;
		$('.carousel-widget').each(function(){

			// SET ID ON ALL OBJECTS
			carousel++;
			var createObj = 'owl'+carousel;
			$(this).css({opacity:0});
			$(this).attr("id", createObj);
			$(this).addClass(createObj);

			var pager = dataCheck($(this).attr('data-pager'));
			var itemsCustom = $(this).attr('data-itemrange') ? strtoArr($(this).attr('data-itemrange')) : [ [0, 1], [420, 2], [600, 3], [768, 3], [980, 4] ];
			var singleItem = dataCheck($(this).attr('data-singleitem'));
			var effect = dataCheck($(this).attr('data-effect'));


			$("."+createObj).animate({opacity:1}, 100, function(){

				 $("."+createObj+ " .carousel .owl-carousel").owlCarousel({
					itemsCustom : itemsCustom,
					navigation : false,
					pagination : pager,
					responsiveBaseWidth: "."+createObj,
					singleItem: singleItem,
					scrollPerPage: 1,
					transitionStyle : effect
				});

				var owl = $("."+createObj+ " .carousel .owl-carousel").data('owlCarousel');
				$("."+createObj).find('.carousel-btn .prev').on('click', function() { owl.prev(); });
				$("."+createObj).find('.carousel-btn .next').on('click', function() { owl.next(); });
			});
		});
	}
}

/*	COUNTDOWN CLOCK
----------------------------*/
function countdownClock(){
	var day = parseInt($("#countdown_dashboard").attr("data-day"),10);
	var month = parseInt($("#countdown_dashboard").attr("data-month"),10);
	var year = parseInt($("#countdown_dashboard").attr("data-year"),10);
	var hour = parseInt($("#countdown_dashboard").attr("data-hr"),10);
	var min = parseInt($("#countdown_dashboard").attr("data-min"),10);
	var sec = parseInt($("#countdown_dashboard").attr("data-sec"),10);

	// DESKTOP CLOCK
	$('#countdown_dashboard').countDown({
		targetDate: {
			'day': 		day,
			'month': 	month,
			'year': 	year,
			'hour': 	hour,
			'min': 		min,
			'sec': 		sec
		},
		omitWeeks: true
	});
}

/*	NOTIFYME
----------------------------*/
function notifyMeForm(){
	$("#notifyMe #submit").on( "click", function() {
		 "use strict";
	    $("#notifyMe").notifyMe();
	    $("#notifyMe .error-text").delay(2000).fadeOut(2000);
	});
}

/*	NAVIGATION
----------------------------*/
function navigation(){
	//open navigation clicking the menu icon
	$('.cd-nav-trigger').on('click', function(event){
		event.preventDefault();
		toggleNav(true);
	});
	//close the navigation
	$('.cd-close-nav, .cd-overlay').on('click', function(event){
		event.preventDefault();
		toggleNav(false);
	});

	//select a new section
	$('.cd-nav li').on('click', function(event){
		toggleNav(false);
	});

	function toggleNav(bool) {
		$('.cd-nav-container, .cd-overlay').toggleClass('is-visible', bool);
		$('main').toggleClass('scale-down', bool);
	}
}

/*	PAGE-TRANSATION
----------------------------*/
function pageTransation(){
	var pageUrl;
	var navlink = $("#navigation .nav-link");
	var ajaxpage = $("#ajax-page");
	var homepage = $("#home-page");
	var home_wrp = $("#home-page .ac");
	var home_anim = $("#home-page .anim");

	navlink.on("click",function(){
		pageUrl = $(this).attr("data-page");


		if($("html").hasClass("ie9")){
			if (pageUrl == 'home.html'){
				$("#ajax-page .pg-wrp .anim").animate({
					opacity: 0
				}, 800, function(){
					home_anim.animate({
						opacity: 1
					}, 800);
				});
			}
			else{
				if(homepage.hasClass("active-home")){
					home_anim.animate({
						opacity: 0
					}, 800, function(){
						$.get(pageUrl, function(data){
							ajaxpage.html(data);
							ajaxpage.addClass("active-page");
							owlCarouselWidget();
						});
						$("#ajax-page .pg-wrp .anim").animate({
							opacity: 1
						}, 800);
					});
				}
				else{
					$("#ajax-page .pg-wrp .anim").animate({
						opacity: 0
					}, 800, function(){
						ajaxpage.html('');
						$.get(pageUrl, function(data){
							ajaxpage.html(data);
							ajaxpage.addClass("active-page");
							owlCarouselWidget();
						});
						$("#ajax-page .pg-wrp .anim").animate({
							opacity: 1
						}, 800);
					});
				}
			}	
		}
		else{
			if (pageUrl == 'home.html'){
				$("#ajax-page .pg-wrp").addClass("fadeOut");
				setTimeout(function(){
					ajaxpage.html('');
					homepage.addClass("active-home");
					home_wrp.addClass("fadeInUp");
					// Resting clock function
					if(ajaxpage.find('#time').length == 0) {
						if (typeof e !== 'undefined') {
							e.doCountDown = function() {}; t='';	
						}; 
					}
				}, 800);
			}
			else{
				if(homepage.hasClass("active-home")){
					homepage.addClass("fadeOut");
					setTimeout(function(){
						homepage.removeClass("active-home");
						homepage.removeClass("fadeOut");
						home_wrp.removeClass("fadeInUp");
						$.get(pageUrl, function(data){
							ajaxpage.html(data);
							ajaxpage.addClass("active-page");
							owlCarouselWidget();
						});	
					}, 800);
				}
				else{
					$("#ajax-page .pg-wrp").addClass("fadeOut");
					setTimeout(function(){
						ajaxpage.html('');
						$.get(pageUrl, function(data){
							ajaxpage.html(data);
							ajaxpage.addClass("active-page");
							owlCarouselWidget();
							// Resting clock function
							if(ajaxpage.find('#time').length == 0) {
								if (typeof e !== 'undefined') {
									e.doCountDown = function() {}; t='';	
								}; 
							}
						});	
					}, 800);
				}
			}
		}
	});
}

/*	TEXT-ANIMATION
----------------------------*/
function textAnimation(){
	$('.flexslider').flexslider({
		animation: "fade",
		directionNav: false,
		slideshowSpeed: 3000,
		controlNav: false
	});
}