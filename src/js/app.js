import * as $ from 'jquery'
import 'bootstrap4-notify'

$(function () {
  'use strict'

  $('html').css('scroll-behavior', 'smooth')

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

  const sendFormDataAs = (name, body) => async (event) => {
    event.preventDefault()
    ym(70746484, 'reachGoal', name)
    try {
      const responce = await fetch('/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })

      if (responce.ok) {
        $.notify('Заявка успешно отправлена!', {
          type: 'success',
        })
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
  }

  $('#form').on(
    'submit',
    sendFormDataAs(
      'order-form',
      JSON.stringify({
        name: $('#name').val(),
        phone: $('#phone').val(),
        message: $('#message').val(),
      })
    )
  )

  $('#form-top').on(
    'submit',
    sendFormDataAs(
      'order-form-top',
      JSON.stringify({
        phone: $('#top-phone').val(),
      })
    )
  )
})
