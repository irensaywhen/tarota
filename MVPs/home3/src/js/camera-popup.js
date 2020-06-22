(function($){

    $(document).ready(function(){
        $('.camera-popup').SlickModals({
            popup_type: 'delayed',
            popup_delayedTime: '0.5s',
            overlay_closesPopup : false,
            popup_closeButtonEnable: false,
            overlay_css: {
                'background': 'rgba(255, 255, 255, 0)'
            },
            popup_css: {
                'width'         : '555px',
                'background'    : '#4f2b7f',
                'border-radius' : '20px',
                'max-width'     : '555px',
                'padding'       : '30px 50px'
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
                'padding'           : '30px 0',
                'animation-duration': '0.4s',
                'background'        : '#4f2b7f',
                'border-radius'     : '20px',
            },
            callback_afterClose: () => {
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
    })
})(jQuery);