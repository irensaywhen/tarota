(function($){

    $(document).ready(function(){
        $('.future-popup').SlickModals({
            popup_closeButtonPlace: 'inside',
            popup_reopenClass: 'open-future-popup',
            overlay_css: {
                'background': 'rgba(255, 255, 255, 0)'
            },
            popup_css: {
                'width'         : '555px',
                'background'    : '#4f2b7f',
                'border-radius' : '20px',
                'border'        : '1px dashed rgba(255, 255, 255, 0.75)',
                'max-width'     : '555px',
                'padding'       : '0'
            },
            mobile_show       : true,
            mobile_breakpoint : '650px',
            mobile_position   : 'center',
            mobile_css        : {
                'width'             : '100%',
                'height'            : 'auto',
                'max-height'        : '94vh',
                'max-width'         : '96vw',
                'border'            : '1px dashed rgba(255, 255, 255, 0.75)',
                'margin'            : '0',
                'padding'           : '0',
                'animation-duration': '0.4s',
                'background'        : '#4f2b7f',
                'border-radius'     : '20px',
            },
            callback_afterClose: () => {
                $('.header-button-call-specialist')
                    .toggleClass('open-future-popup');
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

        $('.header-button-call-specialist').click(function(event){
            $(this).toggleClass('open-future-popup');
        })
    })
})(jQuery);