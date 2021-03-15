import * as $ from 'jquery'
import 'bootstrap4-notify'
import Cleave from 'cleave.js'
import 'cleave.js/dist/addons/cleave-phone.ru'

$(function () {
  'use strict'

  $('html').css('scroll-behavior', 'smooth')

  $('.phone-input')
    .toArray()
    .forEach(function (field) {
      new Cleave(field, {
        phone: true,
        phoneRegionCode: 'RU',
      })
    })

  $.notifyDefaults({
    delay: 2000,
    allow_dismiss: false,
    placement: {
      from: 'top',
      align: 'center',
    },
    animate: {
      enter: 'animate__animated animate__fadeInDown',
      exit: 'animate__animated animate__fadeOutUp',
    },
    template: `<div data-notify="container" class="alert alert-{0}" role="alert">
    <span data-notify="message">{2}</span>
  </div>`,
  })

  if ($(window).scrollTop() > 50) {
    $('#header').addClass('navbar-fixed')
  }

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

  $('#form').on('submit', async (event) => {
    event.preventDefault()
    ym(70746484, 'reachGoal', 'order-form')
    try {
      const responce = await fetch('/feedback', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: $('#name').val(),
          phone: $('#phone').val(),
          message: $('#message').val(),
        }),
      })

      if (responce.ok) {
        $.notify('Заявка успешно отправлена!', {
          type: 'success',
        })

        $('#form').trigger('reset')
      } else {
        $.notify('Произошла ошибка при обработке заявки', {
          type: 'danger',
        })
      }
    } catch (_e) {
      $.notify('Произошла ошибка при попытке отправить заявку', {
        type: 'danger',
      })
    }
  })

  $('#form-top').on('submit', async (event) => {
    event.preventDefault()
    ym(70746484, 'reachGoal', 'order-form-top')
    try {
      const responce = await fetch('/feedback/intro', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: $('#top-phone').val(),
        }),
      })

      if (responce.ok) {
        $.notify('Заявка успешно отправлена!', {
          type: 'success',
        })

        $('#form-top').trigger('reset')
      } else {
        $.notify('Произошла ошибка при обработке заявки', {
          type: 'danger',
        })
      }
    } catch (_e) {
      $.notify('Произошла ошибка при попытке отправить заявку', {
        type: 'danger',
      })
    }
  })
})
