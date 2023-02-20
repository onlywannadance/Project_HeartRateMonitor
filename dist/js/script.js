$(document).ready(function(){

    // Функция слайдера от slick slider с адаптиной настройкой
    $('.carousel__inner').slick({
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/prev.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/next.png"></button>',
        responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 5000,
                arrows: false
            }
        },
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 5000,
                arrows: false
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {        //Смотрим класс с вкладками, мы будем кликать на один из элементов класса
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')      //Если мы нажали на неактивную вкладку, добавляет ей класс активности и убирает класс активности соседних вкладок
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');  //находим родительский контент, в котором ищем нужный контент по вкладке и одновременно закрываем активный контент других классов 
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            }) 
        }); 
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Model

    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn();
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thx, #order').fadeOut();
    });
    // $('.button_mini').on('click', function(){
    //     $('.overlay, #order').fadeIn();
    // });

    $('.button_mini').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            phone: "required"
            },
            messages: {
            name: "Пожалуйста, введите своё имя",
            phone: "Пожалуйста введите номер телефона",
            email: {
                required: "Необходим адресс вашей электронной почты",
                email: "Ваш адресс должен быть в формате name@domain.com"
                }
            }
        });  
    }
    
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('input[name="phone"]').mask("+7 (999) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",               // Получаем данные
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thx').fadeIn();

            $('form').trigger('reset');
        });
        return false;
    });

    // nice upscroll

    $(window).scroll(function() {
        if ($(this).scrollTop()> 1600) {       
            $('.pageup').fadeIn();    
        } else {
            $('.pageup').fadeOut();
        }
    });

    new WOW().init();
});
