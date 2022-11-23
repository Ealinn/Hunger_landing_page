$(function(){
// Custom select
    let $customSelect = $('.booking-form__select');

    $customSelect.each(function() {
        let classes = $(this).attr('class');
        let template =  `<div class="${classes}">`;
        template += '<span class="booking-form__select-trigger">';
        template += `<span class="booking-form__select-trigger-text">${$(this).data('placeholder')}</span>`;
        template += '</span>';
        template += '<div class="booking-form__options">';
        $(this).find('option').each( function() {
            template += `<span class="booking-form__option" data-value="${$(this).attr('value')}">${$(this).html()}</span>`;
        });
        template += '</div></div>';
        let customSelectWrapper = $('<div class="booking-form__select-wrapper"></div>');
        customSelectWrapper.css({
            '-webkit-user-select': 'none',
            '-moz-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none'
        });
        $(this).wrap(customSelectWrapper);
        $(this).after(template);
    });

    $(document).on( 'click', function(e){
        let eTarget = e.target;
        if(!$(eTarget).closest('.booking-form__select-wrapper').hasClass('booking-form__select-wrapper')) {
            $('.booking-form__select').removeClass('opened');
            customOptionsClosed();
        }
    });

    $('.booking-form__select-trigger').on('click', function() {
        $(this).parents('.booking-form__select').toggleClass('opened');

        let timer;
        if( $(this).parents('.booking-form__select').hasClass('opened') ){
            clearTimeout( timer );
            $(this)
                .parents('.booking-form__select')
                .find('.booking-form__options')
                .stop()
                .css('display', 'block')
                .animate({
                    'opacity': '1',
                    'margin-top': '1px'
                },100);
        }
        else{
            customOptionsClosed();
        }
    });

    $('.booking-form__option').on('click', function() {
        $(this)
            .parents('.booking-form__select-wrapper')
            .find('select')
            .val($(this)
            .data('value'));
        $(this)
            .parents('.booking-form__options')
            .find('.booking-form__option')
            .removeClass('selection');
        $(this)
            .addClass('selection');
        $(this)
            .parents('.booking-form__select')
            .removeClass('opened');
        $(this)
            .parents('.booking-form__select')
            .find('.booking-form__select-trigger-text')
            .text($(this).text());
        customOptionsClosed();
    });

    function customOptionsClosed() {
        $('.booking-form__options')
            .stop()
            .animate({
                opacity: 0,
                'margin-top': '0'
            },100);
        t = setTimeout(function(){
            $('.booking-form__options').css('display', 'none');
        }, 500);
    }
});
