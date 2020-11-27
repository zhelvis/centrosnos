import * as $ from 'jquery'

$(function () {
  'use strict'
  // navbar on scroll
  $(window).on('scroll', function () {
    var onScroll = $(this).scrollTop()

    if (onScroll > 50) {
      $('#header').addClass('navbar-fixed')
    } else {
      $('#header').removeClass('navbar-fixed')
    }
  })

  /*
    // our work
    $('.our-work').each(function() { 
        $(this).magnificPopup({
            delegate: '.portfolio-popup',
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    });
    */

  $('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide')
  })
})
