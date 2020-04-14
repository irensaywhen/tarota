(function($){

    //Caching

    let $signUpForm = $('#order_form_sign-up');
    let $passwordField = $('.order-details_password');
    let $orderButton = $('#order-details_button');

    $(window).on('load', function(){

        $('.order-details_button').click(function(event){
            $signUpForm.submit();
        });

        $('#checkbox-create-account').click(function(event){
            
            if($(this).is(':checked')){

                $passwordField.css('display', 'block');
            } else {
                $passwordField.css('display', 'none');
            }
        })

        $('#order_form_sign-up').keypress(function(event){
            let keycode = (event.keyCode ? event.keyCode : event.which);
            if(keycode == '13'){
                 $orderButton.click();
            }
        });
    })
    
})(jQuery);