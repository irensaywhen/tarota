(function($){

    $('.describe-intentions_time').timepicker({
        timeFormat: 'HH:mm',
        interval: 30,
        minTime: '10:00',
        maxTime: '23:30',
        defaultTime: '11',
        startTime: '10:00',
        dynamic: false,
        dropdown: true,
        scrollbar: true
    });
    
})(jQuery);