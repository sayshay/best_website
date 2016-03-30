// функция динамической подгрузки элементов на странице блога
var blogInfinitScrollCicle = 3;
var blogInfinitScrollCicleDone = 0;
blogInfinitScroll = function () {
	var a = blogInfinitScrollCicleDone;
	var b = blogInfinitScrollCicle;
	if (a < b) {
		$.ajax({
			method: "GET",
			url: "ajax/blog-blocks.html",
			beforeSend:function(){
	        	$('.blog-wrap_loading-icon').addClass('active');
	      },
		}).done(function( msg ) {
			elem = $.parseHTML(msg);
			$('.blog-wrap_grid-wrap.grid').append(elem).masonry('addItems', elem);
			$('.blog-wrap_grid-wrap.grid').masonry({
			  columnWidth: '.blog-wrap_grid-wrap_grid-sizer',
			  itemSelector: '.blog-wrap_grid-wrap_item.grid-item',
			  gutter: '.blog-wrap_grid-wrap_grid-gutter',
			  transitionDuration: 0
			});
			$('.blog-wrap_loading-icon').removeClass('active');
			$('.blog-wrap_grid-wrap_item.loaded').removeClass('loaded');
			$('.blog-wrap_infinit-scroll-trigger').removeClass('disabled');
		});
		blogInfinitScrollCicleDone++;
		// console.log('yeah ' + blogInfinitScrollCicleDone);
	}
}

blogInfinitScrollTrigger = function () {
	if ($('.blog-wrap_infinit-scroll-trigger').length > 0) {
		if (!$('.blog-wrap_infinit-scroll-trigger').hasClass('disabled')) {
			var wh = $(window).innerHeight();
			var ws = $(window).scrollTop();

			var trigS = $('.blog-wrap_infinit-scroll-trigger').offset();
			var trigSTop = trigS.top;
			if ((ws+wh) >= trigSTop) {
				$('.blog-wrap_infinit-scroll-trigger').addClass('disabled');
				blogInfinitScroll();
			}
		}
	}
}

// ф-ия для футтера снизу страницы
footerOnBottom = function () {
  var vh = $('footer').outerHeight(true);
  $('.page-wrapp').css('padding-bottom', vh)
}

$(window).on('load', function () {
	// открыть поиск
	$('.header_bottom-line_search_button_trigger').on('click', function () {
		$('.header_bottom-line_search').addClass('active');
	})

	// закрыть поиск
	$(document).click(function(event) {
		if ($(event.target).closest(".header_bottom-line_search").length) return;
		$(".header_bottom-line_search").removeClass("active");
		event.stopPropagation();
	});

	// сортировка блоков категорий на главной
	$('.main-categories-plates.grid').masonry({
	  columnWidth: '.main-categories-plates_grid-sizer',
	  itemSelector: '.main-categories-plates_item.grid-item',
	  gutter: '.main-categories-plates_gutter-sizer'
	});

	// карусель текста на главной
	$('.main-three-col-text-wrap_slider').owlCarousel({
	    loop: false,
	    margin: 0,
	    nav: true,
	    navRewind: false,
	    navText: false,
	    responsive:{
	        0:{
	            items:1
	        },
	        768:{
	            items:2
	        },
	        1202:{
	            items:3
	        }
	    }
	})

	// карусель партнеров в футере
	$('.footer_partners-line_slider').owlCarousel({
	    loop: false,
	    margin: 0,
	    nav: true,
	    navRewind: false,
	    navText: false,
	    responsive:{
	        0:{
	            items:1
	        },
	        612:{
	            items:3
	        },
	        992:{
	            items:4
	        },
	        1202:{
	            items:6
	        }
	    }
	})

	// скролл к началу страницы
	$('.footer_bottom-line_to-top-button').on('click', function () {
		$("html, body").animate({
            scrollTop: 0
        }, 300);
        return false;
	})

	// открыть список в футере на тач девайсах
	$('.footer_second-line_text-block_nav-block_title').on('click', function () {
		var par = $(this).closest('.footer_second-line_text-block_nav-block');
		if (par.hasClass('active')) {
			par.removeClass('active')
		} else {
			$('.footer_second-line_text-block_nav-block').removeClass('active')
			par.addClass('active')
		}
	})

	// закрыть список в футере на тач девайсах
	$(document).click(function(event) {
		if ($(event.target).closest(".footer_second-line_text-block_nav-block").length) return;
		$(".footer_second-line_text-block_nav-block").removeClass("active");
		event.stopPropagation();
	});

	// прижать футер к низу
	footerOnBottom();

	// сортировка блоков в блоге
	$('.blog-wrap_grid-wrap.grid').masonry({
	  columnWidth: '.blog-wrap_grid-wrap_grid-sizer',
	  itemSelector: '.blog-wrap_grid-wrap_item.grid-item',
	  gutter: '.blog-wrap_grid-wrap_grid-gutter'
	});

	// выбор дат
	function cb(start, end) {
        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    }
    cb(moment().subtract(29, 'days'), moment());

    $('#reportrange').daterangepicker({

    }, cb);

    // дропдаун експорта
    $('.export_trig').on('click', function () {
    	var par = $(this).closest('.export');
		if (par.hasClass('active')) {
			par.removeClass('active')
		} else {
			par.addClass('active')
		}
    })
    $(document).click(function(event) {
		if ($(event.target).closest(".export").length) return;
		$(".export").removeClass("active");
		event.stopPropagation();
	});

    // меню в админке на моб
	$('.dashbord-wrap_nav-block_nav-trigger').on('click', function () {
		var par = $(this).closest('.dashbord-wrap_nav-block');
		if (par.hasClass('active')) {
			par.removeClass('active')
		} else {
			par.addClass('active')
		}
    })
    $(document).click(function(event) {
		if ($(event.target).closest(".dashbord-wrap_nav-block").length) return;
		$(".dashbord-wrap_nav-block").removeClass("active");
		event.stopPropagation();
	});

    // графики в админке
	new Chartist.Line('#graph1', {
	  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Nov', 'Dec'],
	  series: [{
		name: 'series-1',
	    data: [1000, 2000, 1000, 3000, 1000, 2000, 1000, 3000, 3000, 1000]
	  }, {
	  	name: 'series-2',
	    data: [3000, 4000, 4000, 5000, 3000, 4000, 3000, 6000, 5000, 2000]
	  }, {
	  	name: 'series-3',
	    data: [4000, 5000, 7000, 6000, 4000, 7000, 6000, 7000, 6000, 4000]
	  }]
	}, {
		fullWidth: true,
		low: 0,
		// showArea: true,
		axisY: {
			labelInterpolationFnc: function(value) {
			  return '$' + (value / 1000) + 'K';
			}
		},
		chartPadding: {
		    right: 40
		},
		lineSmooth: Chartist.Interpolation.none(),
		series: {
			'series-1': {
		      showArea: true,
		    },
		}
	});
})

$( document ).ready(function() {	
})


$(window).on('resize', function () {
	// прижать футер к низу
	footerOnBottom();

	// закрыть список в футере при ресайзе
	$(".footer_second-line_text-block_nav-block").removeClass("active");
})

$(window).on('scroll', function () {
	blogInfinitScrollTrigger();
})