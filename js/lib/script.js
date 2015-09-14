if($.browser.mozilla||$.browser.opera){document.removeEventListener("DOMContentLoaded",$.ready,false);document.addEventListener("DOMContentLoaded",function(){$.ready()},false)}$.event.remove(window,"load",$.ready);$.event.add( window,"load",function(){$.ready()});$.extend({includeStates:{},include:function(url,callback,dependency){if(typeof callback!='function'&&!dependency){dependency=callback;callback=null}url=url.replace('\n','');$.includeStates[url]=false;var script=document.createElement('script');script.type='text/javascript';script.onload=function(){$.includeStates[url]=true;if(callback)callback.call(script)};script.onreadystatechange=function(){if(this.readyState!="complete"&&this.readyState!="loaded")return;$.includeStates[url]=true;if(callback)callback.call(script)};script.src=url;if(dependency){if(dependency.constructor!=Array)dependency=[dependency];setTimeout(function(){var valid=true;$.each(dependency,function(k,v){if(!v()){valid=false;return false}});if(valid)document.getElementsByTagName('head')[0].appendChild(script);else setTimeout(arguments.callee,10)},10)}else document.getElementsByTagName('head')[0].appendChild(script);return function(){return $.includeStates[url]}},readyOld:$.ready,ready:function(){if($.isReady) return;imReady=true;$.each($.includeStates,function(url,state){if(!state)return imReady=false});if(imReady){$.readyOld.apply($,arguments)}else{setTimeout(arguments.callee,10)}}});



$(function(){
	
	var first_load = true;

	$('.new_page').css({left: -$(window).width() + 30, marginLeft: '0px'});

	var trigger = false;

	$(window).keyup(function( event ) {
		if (event.which == 65) { // 65 == "a"
			/*if(trigger == false) {
				$(".header").stop(true).animate({left: "200px"}, 100);
				$(".wrapper").stop(true).animate({left: "200px"}, 100);
				trigger = !trigger;
			} else {
				$(".header").stop(true).animate({left: "0px"}, 100);
				$(".wrapper").stop(true).animate({left: "0px"}, 100);
				trigger = !trigger;
			}*/
		}
	});

	var menu = "closed";

	var speed = 200;

	var menuW = 400;
	var menuH = 210;

	/* MENU HOVER */

	$('.menu__handle').click(function(){
		if(menu == "opened") {
			menu = "closed";
			$('.menu').stop(true).animate({width: "50px", height: "50px"}, speed);
			//$('.menu').stop(true).animate({bottom: "-80px"}, speed);
			$('.menu ul').stop(true).animate({opacity: 0}, speed).fadeOut(speed);
		}
		else {
			menu = "opened";
			$('.menu').stop(true).animate({width: menuW + "px", height: menuH + "px"}, speed);
			//$('.menu').stop(true).animate({bottom: "0px"}, speed);
			$('.menu ul').stop(true).animate({opacity: 1}, speed).fadeIn(speed);
		}
	});

	$(".menu li").hover(
	function() {
		$(".menu .arrow").stop(true).animate({top: $(this).offset().top - 150 - $(window).scrollTop()}, 300);
	},
	function() {
		$(".menu .arrow").stop(true).animate({top: $(".menu li.active").offset().top - 150 - $(window).scrollTop()}, 300);
	});

	/* MENU CLICK */

	var menu_success = true;

	$('.menu li').click(function(){
		if(menu_success == true) {
			
			//loadpage($(this).attr("id"), true);
			menu_success = false;
			//$('.new_page').css({opacity: 1, left: "40px", display: "block"});

			//$('.current_page').css({opacity: 0, display: "none"});

			//setTimeout(function(){$('.current_page').attr('class', 'currp');
			//$('.new_page').attr('class', 'current_page');
			//$('.currp').attr('class', 'new_page');
			fix();
			menu_success = true;
			//}, 400);
			//$('.menu__handle').trigger("click");
			
			$(".menu .arrow").css({top: $(this).offset().top - 150 - $(window).scrollTop()});
			$('.active').removeClass("active");
			$(this).addClass("active");
			$(window).scrollTop(0);
		}

	});


	/* SCROLLING */

	var h2;

	var direction = "";

	var lastScrollTop = 0;

	var fixed = 0;

	$(window).on("scroll",function(event){
		fix();
		var st = $(this).scrollTop();
		if (st > lastScrollTop){
		   direction = "down";
		} else {
		   direction = "up";
		}
		lastScrollTop = st;
	});

		var header_h = 80;

	function fix() {
		h2 = $('.current_page h2');

		if($(window).scrollTop() < 20){
			//$('.header').css({backgroundColor: 'rgba(255,255,255,0)', boxShadow: 'none'});
			//$('.header').css({height: "110px"});
			$('h2.fixed').css({display: "block"});
			$('h2.fixed').removeClass('fixed');
			$('.current_page').css({paddingTop: '0px'});
			$('.h2_imitate').remove();
			//$(".h2_title h2").html("");

			fixed = 0;
		}

		/*for(var i = 0; i < h2.length; i++) {
			if($(window).scrollTop() >= h2.eq(i).offset().top - 125 && ((h2.eq(i).offset().top >= h2.eq(fixed).offset().top && direction == "down") || (h2.eq(i).offset().top <= h2.eq(fixed).offset().top && direction == "up"))) {
				$('.header').css({backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0px 1px 2px rgba(0,0,0,0.1)'});
				$('h2.fixed').css({paddingLeft: 0});
				$('h2.fixed').removeClass('fixed');
				$('.h2_imitate').remove();
				$('<div class="h2_imitate"></div>').insertBefore(h2.eq(i));
				h2.eq(i).addClass('fixed');
				$('.current_page').css({paddingTop: '7px'});
				$(h2.eq(i)).css({paddingLeft: $('.header').css("left")});
				fixed = i;
				//fixd.css({paddingLeft: 0});
			}
		}*/

		for(var i = 0; i < h2.length; i++) {
			if($(window).scrollTop() >= h2.eq(i).offset().top - (header_h + 5)) {
				if(direction == "down" || direction == "up") {
					if((direction == "down" && i >= fixed) || (direction == "up" && i < fixed && $(window).scrollTop() + (header_h + 10) <= $('.h2_imitate').offset().top)) {
						//$('.header').css({backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0px 1px 2px rgba(0,0,0,0.1)'});
						//$('.header').css({height: "145px"});
						//$(".h2_title h2").html(h2.eq(i).html().substring(0));
						//$('h2.fixed').css({paddingLeft: 0, display: "block"});
						$('h2.fixed').removeClass('fixed');
						$('.h2_imitate').remove();
						$('<div class="h2_imitate"></div>').insertBefore(h2.eq(i));
						h2.eq(i).addClass('fixed');
						$('.current_page').css({paddingTop: '7px'});
						//$(h2.eq(i)).css({paddingLeft: $('.header').css("left")});
						//fixd.css({paddingLeft: 0});
						fixed = i;
					}
				} else {
					//$('.header').css({backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0px 1px 2px rgba(0,0,0,0.1)'});
					//$('.header').css({height: "145px"});
					//$(".h2_title h2").html(h2.eq(i).html().substring(0));
					//$('h2.fixed').css({paddingLeft: 0, display: "block"});
					$('h2.fixed').removeClass('fixed');
					$('.h2_imitate').remove();
					$('<div class="h2_imitate"></div>').insertBefore(h2.eq(i));
					h2.eq(i).addClass('fixed');
					$('.current_page').css({paddingTop: '7px'});
					//$(h2.eq(i)).css({paddingLeft: $('.header').css("left")});
					//fixd.css({paddingLeft: 0});
					fixed = i;
				}
			}
		}

		/*for(var i = 0; i < h2.length; i++) {
			if($(window).scrollTop() >= h2.eq(i).offset().top - 125) {
				fixd = $('h2.fixed');
				$('.header').css({backgroundColor: 'rgba(255,255,255,0.95)', boxShadow: '0px 1px 2px rgba(0,0,0,0.1)'});
				$('h2.fixed').css({paddingLeft: 0});
				$('h2.fixed').removeClass('fixed');
				$('.h2_imitate').remove();
				$('<div class="h2_imitate"></div>').insertBefore(h2.eq(i));
				h2.eq(i).addClass('fixed');
				$('.current_page').css({paddingTop: '7px'});
				$(h2.eq(i)).css({paddingLeft: $('.header').css("left")});
				//fixd.css({paddingLeft: 0});
			}
		}*/
	}

	/* NOTIFICATIONS OPENING */

	$('.notif').click(function(){
		$('.dim').css({display: 'block'});
		$('.dim').animate({opacity: 1}, 200);
		$('.wrapper').addClass('blur');
		$('.left').addClass('blur');
		$('body').css({'overflow-y': 'hidden'});
	});

	/* NOTIFICATIONS CLOSING */

	$('.dim .close').hover(
	function(){
		$('.dim').stop().animate({top: '-100px'}, 100);
		$('.dim .close').stop().animate({color: '#000'}, 100);
	},
	function(){
		$('.dim').stop().animate({top: '0px'}, 100);
		$('.dim .close').stop().animate({color: '#fff'}, 100);
	});

	$('.dim .close').click(function(){
		setTimeout(function(){$('.dim').css({display: 'none'});}, 200);
		$('.dim').animate({opacity: 0}, 200);
		$('.wrapper').removeClass('blur');
		$('.left').removeClass('blur');
		$('body').css({'overflow-y': 'auto'});
	});

	/* LOGIN OPENING */

	$('.login').click(function(){
		//$('.dim').css({display: 'block'});
		//$('.dim').animate({opacity: 1}, 200);
		//$('.wrapper').addClass('blur');
		//$('.left').addClass('blur');
		//$('body').css({'overflow-y': 'hidden'});
		//$('.popup').stop(true).animate({opacity: 1}, 200).fadeIn(200);
		//$('.frame').stop(true).animate({opacity: 1}, 200).fadeIn(200);
	});

	/* LOGIN CLOSING */


	$('.popup').click(function(){
		/*setTimeout(function(){$('.popup').css({display: 'none'});}, 200);
		setTimeout(function(){$('.frame').css({display: 'none'});}, 200);
		$('.popup').animate({opacity: 0}, 200);
		$('.frame').animate({opacity: 0}, 200);
		$('.wrapper').removeClass('blur');
		$('.left').removeClass('blur');*/
		$('.popup').stop(true).animate({opacity: 0}, 200).fadeOut(200);
		$('.frame').stop(true).animate({opacity: 0}, 200).fadeOut(200);
		$('body').css({'overflow-y': 'auto'});
	});


	$(".login_submit").hover(
		function(){
			$(this).stop(true).animate({backgroundColor: "#fff", color: "#47a3da"}, 100);
		},
		function(){
			$(this).stop(true).animate({backgroundColor: "#47a3da", color: "#fff"}, 100);
		}
	);

	$(".login_submit").on("focus", function() {
		$(this).stop(true).animate({backgroundColor: "#fff", color: "#47a3da"}, 100);
	});

	$(".login_submit").on("blur", function() {
		$(this).stop(true).animate({backgroundColor: "#47a3da", color: "#fff"}, 100);
	});

	$(".login_submit").on("click", function(){
		var login = $("#log").val();
		var password = $("#pass").val();
		$.ajax({
			type: "POST",
			url: "ajax.php",
			data: {login: login, password: password},
			cache: false,
			dataType: "json",
			success: function(response){
				if(response[0] == 0) {
					$(".login .error").stop(true).html(response[1]).fadeIn(300).delay(5000).fadeOut(300);
				} else if(response[1]) {
					var slidespeed = 500;
					var del = 200;
					$(".login #log").stop(true).animate({opacity: 0}, slidespeed);
					$(".login #pass").stop(true).animate({opacity: 0}, slidespeed);
					$(".login .login_submit").stop(true).animate({opacity: 0}, slidespeed);
					$(".login a").stop(true).animate({opacity: 0}, slidespeed);
					$(".login .error").stop(true).animate({opacity: 0}, slidespeed);
					$(".login .success").html(response[1]).stop(true).delay(del).animate({left: 0}, slidespeed);
				}
			}
		});
		return false;  
	});
  
}) 