"use strict";
(function ($) {
/*--
Commons Variables
-----------------------------------*/
var windows = $(window),
$body = $('body');

/*--
    Menu Sticky
-----------------------------------*/
var sticky = $('.header-sticky');

windows.on('scroll', function() {
    var scroll = windows.scrollTop();
    if (scroll < 350) {
        sticky.removeClass('is-sticky');
        sticky.removeClass('lock-padding');
    }else{
        sticky.addClass('is-sticky');
        sticky.addClass('lock-padding');
    }
});

 /*---------------------------------------------
               mobile menu active
    --------------------------------------------*/

    $("#mobile-menu-trigger").on('click', function(){
        $("#mobile-menu-overlay").addClass("active");
        $body.addClass('no-overflow');
    });

    $("#mobile-menu-close-trigger").on('click', function(){
        $("#mobile-menu-overlay").removeClass("active");
        $body.removeClass('no-overflow');
    });

    /*------  End of mobile menu active  -------*/



    /*---------------------------------------------
               offcanvas mobile menu
    -----------------------------------------------*/

    var $offCanvasNav = $('.offcanvas-navigation'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.submenu2');

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i></i></span>');

    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();

    /*Category Sub Menu Toggle*/
    $offCanvasNav.on('click', 'li a, li .menu-expand', function(e) {
        var $this = $(this);
        if ( ($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('menu-expand')) ) {
            e.preventDefault();
            if ($this.siblings('ul:visible').length){
                $this.parent('li').removeClass('active');
                $this.siblings('ul').slideUp();
            } else {
                $this.parent('li').addClass('active');
                $this.closest('li').siblings('li').removeClass('active').find('li').removeClass('active');
                $this.closest('li').siblings('li').find('ul:visible').slideUp();
                $this.siblings('ul').slideDown();
            }
        }
    });


    /*=====  End of offcanvas mobile menu  ======*/
  /*--
      - Background Image
  ------------------------------------------*/
  var $backgroundImage = $('.bg-image');
  $backgroundImage.each(function() {
      var $this = $(this),
          $bgImage = $this.data('bg');
      $this.css('background-image', 'url('+$bgImage+')');
  });

  /*--
      Sliders
  -----------------------------------*/
  // Work Slider
  $('.work-slider-two').slick({
      infinite: true,
      arrows: true,
      dots: false,
      slidesToShow: 5,
      slidesToScroll: 3,
      prevArrow: '<button class="slick-prev" title="Предыдущий слайд"><i class="fa fa-angle-left"></i></button>',
      nextArrow: '<button class="slick-next" title="Следующий слайд"><i class="fa fa-angle-right"></i></button>',
      responsive: [
          {
              breakpoint: 1501,
              settings: {
                  slidesToShow: 4,
              }
          },
          {
              breakpoint: 1199,
              settings: {
                  slidesToShow: 3,
              }
          },
          {
              breakpoint: 992,
              settings: {
                  slidesToShow: 2,
              }
          },
          {
              breakpoint: 768,
              settings: {
                  slidesToShow: 2,
              }
          },
          {
              breakpoint: 575,
              settings: {
                  slidesToShow: 1,
              }
          },
      ]
  });


  /*-------------------------------------
      Direction Aware Hover Effect
  --------------------------------------*/
  var daHover = function(){
      $('.daHover').each(function(){
          $(this).hoverdir({
              hoverElem : '.daHoverElem'
          });
      });
  };
  daHover();

  /*---------------------------------
  	Jarallax Background Activation
  -----------------------------------*/
  $('.jarallax').jarallax({
      speed: 0.5,
      imgPosition: "50% -50%"
  });

  /* --------------------------------------------------------
      FAQ Accordion
  * -------------------------------------------------------*/
  $('.card-header a').on('click', function() {
      $('.card').removeClass('actives');
      $(this).parents('.card').addClass('actives');
    });

  /*----------------------------------
      ScrollUp Active
  -----------------------------------*/
  $.scrollUp({
      scrollText: '<i class="fa fa-angle-up"></i>',
      easingType: 'linear',
      scrollSpeed: 900,
      animation: 'fade'
  });

  /*-----------------------------------
     Scroll to anchor
  -----------------------------------*/
  $('._anchor-link').click(function(e){
    e.preventDefault();
    var _href = $(this).attr('href');
    var selector = '._anchor[data-anchor=' + _href + ']';
    var toElem = $(selector);
    var toTop = toElem.offset().top;
    console.log(toTop);
    $("html, body").animate({scrollTop:toTop  - toElem.height() - 70});
      return false;
   });

  /*-----------------------------------
      Fancybox gallery
  -----------------------------------*/
  $(document).ready(function() {
    $(".fancybox").fancybox();
  });
})(jQuery);

document.addEventListener('DOMContentLoaded', function() {

  /*-----------------------------------
      Form
  -----------------------------------*/

  var forms = document.querySelectorAll('._form form');
  var inputsReq = document.querySelectorAll('input[required]');

  // функции обработки ошибок

  function formAddError(input) {
    var msg = input.parentElement.querySelector('.error-msg');

    input.parentElement.classList.add('error');
    input.classList.add('error');
    document.addEventListener('click', removeErrors);

    if (input.validationMessage !== '') {
      msg.textContent = input.validationMessage;
      msg.classList.add('error');
    } else {
      var msgText = input.getAttribute('data-msg');
      msgText ? msg.textContent = msgText : msg.textContent = 'Пожалуйста, введите корректные данные. Мы в Вас верим!';
      msg.classList.add('error');
    }
  }

  function formRemoveError(input) {
    var msg = input.parentElement.querySelector('.error-msg');

    input.parentElement.classList.remove('error');
    input.classList.remove('error');
    msg.textContent = '';
    msg.classList.remove('error');
  }

  function removeErrors() {
    var invalidInputs = document.querySelectorAll('input.error');
    if (invalidInputs) {
      invalidInputs.forEach(function(it){
        formRemoveError(it);
        document.removeEventListener('click', removeErrors);
      });
    }
  }

  //функции валидации

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  // маски

  function phoneMask(input) {
    var mask = IMask( input, {
      mask: '+{7}(000)000-00-00',
      minLength: 11
    });
  }

  function addInputMask() {
    var inputsTel = document.querySelectorAll('input[type=tel]');
    if (inputsTel) {
      inputsTel.forEach(function(inputTel) {
        phoneMask(inputTel);
      });
    }
  }

  addInputMask();

  //функции обработки succsess

  function  onFormSuccess(form) {
    var fileUrl = form.getAttribute('data-file-url');
    if (fileUrl) {
      var link = document.createElement('a');
      link.setAttribute('download', '');
      link.href = fileUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      var modal = document.querySelector('._popup-success');
      if (modal) {
        popupOpen(modal);
      } else {
        alert('Данные успешно отправлены');
      }
    }
  }

  //функции обработки error

  //валидация
  if (forms && inputsReq) {
    //обработка обязательных полей
    inputsReq.forEach(function(it) {
      it.addEventListener('input', function() {
        if (it.validity.valid) {
          formRemoveError(it);
        }
      });
      it.addEventListener('invalid', function(e) {
        e.preventDefault();
        formAddError(it);
      });
    });
    //обработка формы
    forms.forEach(function(form) {
    var url = form.getAttribute('action');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
      e.preventDefault();

      var error = formValidate(form);
      var formData = new FormData(form);

      if (error === 0) {
        form.classList.add('_sending');
        var response = await fetch(url, {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          // alert('Форма успешно отправлена');
          onFormSuccess(form);
          form.reset();
          form.classList.remove('_sending');
        } else {
          alert('Произошла ошибка при отправке формы');
          form.classList.remove('_sending');
        }

      } else {
        // alert('заполните обязательные поля');
      }
    }

    function formValidate(form) {
      var error = 0;
      var formReq = form.querySelectorAll('input[required]');

      for (var i = 0; i < formReq.length; i++) {
        var input = formReq[i];
        formRemoveError(input);

        var inputType = input.getAttribute('type');

        if (inputType === 'email') {
          if (emailTest(input)) {
            formAddError(input);
            error++;
          }
        } else {
            if (input.value === '') {
              formAddError(input);
              error++;
            }
          }
        }
        return error;
      }
    });
  }

  /*----------------------------------
      Popup
  -----------------------------------*/

  var popupBtns = document.querySelectorAll('._popup-btn');
  var body = document.querySelector('body');
  var lockPadding = document.querySelectorAll('.lock-padding');

  var unlock = true;

  var timeout = 800;

  if (popupBtns.length > 0) {

    popupBtns.forEach(function(popupBtn) {
      popupBtn.addEventListener('click', function() {
        var popupName = popupBtn.getAttribute('data-popup');
        var curentPopup = document.querySelector('.' + popupName);
        popupOpen(curentPopup);
      });
    });
  }

  var popupCloseBtns = document.querySelectorAll('.close-popup');

  if (popupCloseBtns.length > 0) {
    popupCloseBtns.forEach(function(popupCloseBtn) {
      popupCloseBtn.addEventListener('click', function() {
        console.log(popupCloseBtn);
        popupClose(popupCloseBtn.closest('.popup'));
      });
    });
  }

  function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
      var popupActive = document.querySelector('.popup.open');
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener("click", function (e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    var lockPadding = document.querySelectorAll('.lock-padding');
    var scrollUp = document.querySelector('#scrollUp');
    var lockPaddingValue = window.innerWidth - document.querySelector('#main-wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      lockPadding.forEach(function(el) {
        el.style.paddingRight = lockPaddingValue;
      });
    }
    if (scrollUp) {
      scrollUp.style.display = 'none';
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    var lockPadding = document.querySelectorAll('.lock-padding');
    var scrollUp = document.querySelector('#scrollUp');
    setTimeout(function () {
      if (lockPadding.length > 0) {
        lockPadding.forEach(function(el) {
          el.style.paddingRight = '0';
        });
      }
      if (scrollUp) {
        scrollUp.style.display = 'block';
      }
      body.style.paddingRight = '0';
      body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      var popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
    }
  });

  (function () {
    // проверяем поддержку
    if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function (css) {
        var node = this;
        while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
        }
        return null;
      };
    }
  })();
  (function () {
    // проверяем поддержку
    if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
  })();


  /*----------------------------------
      Ymap start
  -----------------------------------*/
  var spinner = $('.ymap-container').children('.loader');
  var check_if_load = 0;
  var myMapTemp, myPlacemarkTemp;


  function init () {
    var myMapTemp = new ymaps.Map("map-yandex", {
      center: [55.730138, 37.594238],
      zoom: 7,
      controls: ['zoomControl', 'fullscreenControl']
    });

    var myPlacemarkTemp = new ymaps.Placemark([55.730138, 37.594238], {
        balloonContent: "Здесь может быть ваш адрес",
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#imageWithContent',
        // Своё изображение иконки метки.
        iconImageHref: '../images/map/map-marker.png',
        // Размеры метки.
        iconImageSize: [50, 50],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-25, -50],
    });

    myMapTemp.geoObjects.add(myPlacemarkTemp);

    //Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    var layer = myMapTemp.layers.get(0).get(0);

    //Решение по callback-у для определния полной загрузки карты: http://ru.stackoverflow.com/questions/463638/callback-загрузки-карты-yandex-map
    waitForTilesLoad(layer).then(function() {
      //Скрываем
      spinner.removeClass('is-active');
    });
  }

  function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise(function (resolve, reject) {
      var tc = getTileContainer(layer), readyAll = true;
      tc.tiles.each(function (tile, number) {
        if (!tile.isReady()) {
          readyAll = false;
        }
      });
      if (readyAll) {
        resolve();
      } else {
        tc.events.once("ready", function() {
          resolve();
        });
      }
    });
  }

  function getTileContainer(layer) {
    for (var k in layer) {
      if (layer.hasOwnProperty(k)) {
        if (
          layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
          || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
        ) {
          return layer[k];
        }
      }
    }
    return null;
  }

  function loadScript(url, callback){

    var script = document.createElement("script");

    if (script.readyState){  //IE
      script.onreadystatechange = function(){
        if (script.readyState == "loaded" ||
                script.readyState == "complete"){
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {  //Другие браузеры
      script.onload = function(){
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  }

  var ymap = function() {
    $('.ymap-container').mouseenter(function(){
        if (check_if_load == 0) {
          check_if_load = 1;

          spinner.addClass('is-active');

          loadScript("https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;loadByRequire=1", function(){
             ymaps.load(init);
          });

        }
      }
    );
  }
  //Map Yandex
  ymap();
});
