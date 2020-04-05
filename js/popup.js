(function($){

    $('.wallet-popup').SlickModals({
        popup_closeButtonPlace: 'inside',
        popup_reopenClass: 'open-wallet',
        overlay_css: {
            'background': 'rgba(255, 255, 255, 0)'
        },
        popup_css: {
            'width'         : '80%',
            'background'    : '#4f2b7f',
            'border-radius' : '20px',
            'max-width'     : '920px',
        },
        'mobile_show'       : true,
        'mobile_breakpoint' : '760px',
        'mobile_position'   : 'center',
        'mobile_css'        : {
            'width'             : '100%',
            'height'            : 'auto',
            'background'        : '#fff',
            'margin'            : '0',
            'padding'           : '18px',
            'animation-duration': '0.4s',
            'background'        : '#4f2b7f',
            'border-radius'     : '20px',
        },
        callback_afterClose: () => {
            $('.account-button:nth-of-type(1)')
                .toggleClass('open-wallet');
            $('.inner-wrapper').css({
                '-webkit-filter': '',
                'filter': ''
            });
            
        },
        callback_afterOpen: () => {
            $('.inner-wrapper').css({
                '-webkit-filter': 'blur(5px)',
                'filter': 'blur(5px)'
            })
        }
    });

    $('.account-button:nth-of-type(1)').click(function(event){
        $(this).toggleClass('open-wallet');
        console.log(this);
    })
    
})(jQuery);