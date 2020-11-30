import * as $ from 'jquery'

$(function () {
  'use strict'
  $(window).on('scroll', function () {
    var onScroll = $(this).scrollTop()

    if (onScroll > 50) {
      $('#header').addClass('navbar-fixed')
    } else {
      $('#header').removeClass('navbar-fixed')
    }
  })

  $('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide')
  })
})
