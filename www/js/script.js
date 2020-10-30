"use strict";

$(document).ready(function () {
  //Бургер
  var isMobile = window.matchMedia("(max-width: 1200px)").matches;
  var burger = document.querySelector('#burger');

  if (burger && isMobile) {
    var toggleBurger = function toggleBurger(event) {
      event.preventDefault();
      $(menuBlock).slideToggle(300);
      burger.classList.toggle('burger--open');
    };

    burger.addEventListener('click', toggleBurger);
    var menuBlock = document.querySelector('.menu-block');
  } //Промо-слайдер


  $('#promo-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    appendDots: $('.promo-slider__dots'),
    rows: 0,
    prevArrow: '#promo-slider-prev',
    nextArrow: '#promo-slider-next',
    speed: 1000,
    fade: true,
    cssEase: 'linear',
    responsive: [{
      breakpoint: 670,
      settings: {
        arrows: false
      }
    }]
  }); //Аккордион

  var accordion = document.querySelectorAll('.accordion');

  if (accordion.length !== 0) {
    var toggleAccordion = function toggleAccordion(event) {
      var bodyAccordion = this.parentNode.querySelector('.accordion__info');
      $(bodyAccordion).slideToggle(300);
      this.parentNode.classList.toggle('accordion--open');
    };

    for (var i = 0; i < accordion.length; i++) {
      accordion[i].querySelector('.accordion__name').addEventListener('click', toggleAccordion);
    }
  } //Переход по ссылке-анкору


  $('.link-anchor').on("click", function (e) {
    e.preventDefault();
    var mylink = $(this).attr('href');
    var positionblock = $(mylink).offset().top;

    if (isMobile) {
      var heightHeader = document.querySelector('.contacts-line').clientHeight;
      positionblock = positionblock - heightHeader; //создаем событие клика по бургеру

      var clickBurger;

      if (typeof Event === 'function') {
        clickBurger = new Event('click', {
          bubbles: true,
          cancelable: true
        });
      } else {
        clickBurger = document.createEvent('Event');
        clickBurger.initEvent('click', true, true);
      }

      document.querySelector('#burger').dispatchEvent(clickBurger); //вызываем событие
      //Запись не пододит для ie!
      // var clickBurger = new Event('click', { bubbles: true, cancelable: true });
      // document.querySelector('#burger').dispatchEvent(clickBurger); 
    }

    $('html, body').animate({
      scrollTop: positionblock
    }, 1100);
  });
});
$(document).ready(function () {
  //Form
  var formInPage = document.querySelectorAll('form');

  if (formInPage.length !== 0) {
    for (var formItem = 0; formItem < formInPage.length; formItem++) {
      formInPage[formItem].addEventListener('submit', validateForm);
    }
  }

  function validateForm(event) {
    var form = event.target;
    var error = validateFields(form); //запускаем проверку полей в этой форме

    if (error === true) {
      /*если есть ошибка*/
      event.preventDefault();

      if (!form.querySelector('.form__message')) {
        form.insertAdjacentHTML('beforeend', '<div class="form__message form__message--error">Ошибки заполнения. Пожалуйста, проверьте все поля и отправьте снова.</div>');
      }
    } else {
      /*если нет ошибки - отправляем форму*/
      event.preventDefault();
      form.insertAdjacentHTML('beforeend', '<div class="form__message form__message--ok">Ваша заявка принята. Мы свяжемся с вами в ближайшее время</div>');
      sendAjaxForm(form); //отправка формы

      resetForm(form); //очищаем форму
    }
  }

  function validateFields(form) {
    var error = false;
    var requredItems = form.querySelectorAll('[required]');

    for (var item = 0; item < requredItems.length; item++) {
      if (requredItems[item].classList.contains('form-phone')) {
        validateEmail(requredItems[item]);
      } //для email-а


      if (!requredItems[item].checkValidity()) {
        requredItems[item].classList.add('form__input--error');
        error = true;

        if (!requredItems[item].parentNode.querySelector('.form__input-error-text')) {
          var messageErrorInput = requredItems[item].dataset.formError;
          requredItems[item].parentNode.insertAdjacentHTML('beforeend', "<div class=\"form__input-error-text\">".concat(messageErrorInput, "</div>"));
        }
      } else {
        if (requredItems[item].parentNode.querySelector('.form__input-error-text')) {
          var errorInputText = requredItems[item].parentNode.querySelector('.form__input-error-text');
          errorInputText.parentNode.removeChild(errorInputText);
        }
      }

      requredItems[item].addEventListener('input', changeFields); //подписываем на событие input на поле

      requredItems[item].addEventListener('change', changeFields); //для checkbox/radio
    }

    return error;
  }

  function validateEmail(email) {
    var emailNumbers = email.value;
    var regexpNumbers = new RegExp(/[^\d]/g);
    var emailNumbers = emailNumbers.replace(regexpNumbers, '');

    if (emailNumbers.length < 11) {
      email.setCustomValidity('error'); //пользовательская ошибка!
    } else {
      email.setCustomValidity('');
    }
  }

  function changeFields(event) {
    var eventTarget = event.target;

    if (eventTarget.classList.contains('form-phone')) {
      validateEmail(eventTarget);
    } //для email-а


    if (eventTarget.checkValidity()) {
      eventTarget.classList.remove("form__input--error");

      if (eventTarget.closest('form').querySelector('.form__message')) {
        var error = validateFields(eventTarget.closest('form'));

        if (error === false) {
          var messageForm = eventTarget.closest('form').querySelector('.form__message');
          messageForm.parentNode.removeChild(messageForm);
        }
      }
    }
  }

  function resetForm(form) {
    $(form).trigger('reset');
    $('select').val('').change(); //для select2 !!!

    setTimeout(function () {
      if (form.querySelector('.form__message')) {
        form.querySelector('.form__message').parentNode.removeChild(form.querySelector('.form__message'));
      }
    }, 5000);
  }

  function sendAjaxForm(dataForm) {
    $.ajax({
      url: dataForm.action,
      //url страницы jquery-mailer.php
      type: "POST",
      //метод отправки
      data: $(dataForm).serialize(),
      // Сеарилизуем объект
      success: function success(response) {
        //Данные отправлены успешно
        console.log('ok');
      },
      error: function error(response) {
        // Данные не отправлены          
        console.log('error');
      }
    });
  }

  ; // Ставим ограничения на ввод email-а

  var inputEmails = document.querySelectorAll('.form-phone');

  if (inputEmails.length !== 0) {
    var replacePhoneNum = function replacePhoneNum(event) {
      var regexpPhone = new RegExp(/[^\d\-\+\(\)\ ]/);
      event.target.value = event.target.value.replace(regexpPhone, '');
    };

    for (var i = 0; i < inputEmails.length; i++) {
      inputEmails[i].addEventListener('input', replacePhoneNum);
    }
  }

  var haveSelect = $(".select2-action");

  if (haveSelect.length != 0) {
    //Если меняется select2, то вызываем функцияю изменения select
    var changeSelect = function changeSelect(event) {
      //создаем событие изменение select
      var changeSelectEvent;

      if (typeof Event === 'function') {
        changeSelectEvent = new Event('input', {
          bubbles: true,
          cancelable: true
        });
      } else {
        changeSelectEvent = document.createEvent('Event');
        changeSelectEvent.initEvent('input', true, true);
      }

      this.closest('.select2-action').querySelector('select').dispatchEvent(changeSelectEvent); //вызываем событие
    };

    $('.select2-action select').select2({
      theme: 'theme-select2-action'
    }).on('change', changeSelect).trigger('change');
  }

  ; //Select2
  // var haveSelect = $(".select2-action");
  // if (haveSelect.length != 0) {
  //     $('.select2-action select').select2({
  //         theme: 'theme-select2-action'
  //     });
  // };
});
/*Полифилы для ie*/

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
}