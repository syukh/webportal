$(document).ready(function () {

  // === Slick Slider === //
  // $('.slider').slick({
  //   prevArrow: '<img class="slider-arrows slider-arrows-left" src="../img/arrows-left.svg"/>',
  //   nextArrow: '<img class="slider-arrows slider-arrows-right" src="../img/arrows-right.svg"/>',
  //   infinite: true,
  //   fade: true,
  //   dots: true,
  //   autoplay: true,
  //   autoplaySpeed: 4000,
  // });


  // ===  Slick Slider PHP === //
  var uri = $('#main').attr('data-uri');
  $('.slider').slick({
    prevArrow: '<img class="slider-arrows slider-arrows-left" src="' + uri + '/img/arrows-left.svg"/>',
    nextArrow: '<img class="slider-arrows slider-arrows-right" src="' + uri + '/img/arrows-right.svg"/>',
    infinite: true,
    fade: true,
    dots: true,
  });

  //click-button menu

  function OffScroll() {
    var winScrollTop = $(window).scrollTop();
    $(window).bind("scroll", function () {
      $(window).scrollTop(winScrollTop);
    });
  }

  $(".icon-bars__link").click(function () {
    $(".overlay-scale").addClass("open");
    $(".wrap-mobile-menu > button").addClass("show-button");
    OffScroll();
  });

  $(".wrap-mobile-menu > button").click(function () {
    $(".overlay-scale").removeClass("open");
    $(".wrap-mobile-menu > button").removeClass("show-button");
    $(window).unbind("scroll");
  });

  new SimpleBar(document.getElementById('spbar'), {
    autoHide: false
  });

  var bar = $('.simplebar-vertical').attr('style');

  function SimpleScrollBar() {
    if (bar === 'visibility: visible;') {
      $('.course-element').addClass('padding-plus');
      $('.course-element').removeClass('padding-min');
      $('.lesson-item').addClass('padding-plus');
      $('.lesson-item').removeClass('padding-min');
      $('.lesson-page').addClass('padding-plus');
      $('.lesson-page').removeClass('padding-min');
    } else {
      $('.course-element').removeClass('padding-plus');
      $('.course-element').addClass('padding-min');
      $('.lesson-item').removeClass('padding-plus');
      $('.lesson-item').addClass('padding-min');
      $('.lesson-page').removeClass('padding-plus');
      $('.lesson-page').addClass('padding-min');
    }
  };

  SimpleScrollBar();

  $(window).resize(function () {
    SimpleScrollBar()
  });

  // === Color === //
  let color = $('#menu').attr('class');
  switch (color) {
    case "word":
      $('.accent').addClass('color-word');
      $('.simplebar-scrollbar').addClass('color-word');
      $('.dowload-btn__wraper').addClass('word');
      $('.nav__tooltip').addClass('word');
      $('.nav__tooltip').addClass('word');
      $('.lesson-list').addClass('word');
      break;

    case "excel":
      $('.accent').addClass('color-excel');
      $('.simplebar-scrollbar').addClass('color-excel');
      $('.dowload-btn__wraper').addClass('excel');
      $('.nav__tooltip').addClass('excel');
      $('.nav__tooltip').addClass('excel');
      $('.lesson-list').addClass('excel');
      break;

    case "point":
      $('.accent').addClass('color-point');
      $('.simplebar-scrollbar').addClass('color-point');
      $('.dowload-btn__wraper').addClass('point');
      $('.nav__tooltip').addClass('point');
      $('.nav__tooltip').addClass('point');
      $('.lesson-list').addClass('point');
      break;

    case "python":
      $('.accent').addClass('color-python');
      $('.simplebar-scrollbar').addClass('color-python');
      $('.dowload-btn__wraper').addClass('python');
      $('.nav__tooltip').addClass('python');
      $('.nav__tooltip').addClass('python');
      $('.lesson-list').addClass('python');
      break;

    case "pascal":
      $('.accent').addClass('color-pascal');
      $('.simplebar-scrollbar').addClass('color-pascal');
      $('.dowload-btn__wraper').addClass('pascal');
      $('.nav__tooltip').addClass('pascal');
      $('.nav__tooltip').addClass('pascal');
      $('.lesson-list').addClass('pascal');
      break;

    case "html":
      $('.accent').addClass('color-html');
      $('.simplebar-scrollbar').addClass('color-html');
      $('.dowload-btn__wraper').addClass('html');
      $('.nav__tooltip').addClass('html');
      $('.nav__tooltip').addClass('html');
      $('.lesson-list').addClass('html');
      break;

    case "css":
      $('.accent').addClass('color-css');
      $('.simplebar-scrollbar').addClass('color-css');
      $('.dowload-btn__wraper').addClass('css');
      $('.nav__tooltip').addClass('css');
      $('.nav__tooltip').addClass('css');
      $('.lesson-list').addClass('css');
      break;

    
    default:
      $('.accent').addClass('color-accent');
  }
 
});