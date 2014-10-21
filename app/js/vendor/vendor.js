console.log('vendor is loaded');

var $ = window.jQuery;

var $mainAsideNav = $('.main__aside__nav');

$mainAsideNav.find('li').on('mouseover click touchstart', function() {
  $(this).addClass('is-active');
});

$mainAsideNav.on('mouseleave', function() {
  $(this).find('li').removeClass('is-active');
});
