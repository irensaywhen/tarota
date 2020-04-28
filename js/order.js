(function($){

    //Caching

    let $signUpForm = $('#order_form_sign-up');
    let $passwordField = $('.order-details_password');
    let $orderButton = $('#order-details_button');
    let $createAccountLabel = $('.checkbox-create-account-label');

    $(window).on('load', function(){

        $('.order-details_button').click(function(event){
            $signUpForm.submit();
        });

        $('#checkbox-create-account').click(function(event){
            
            if($(this).is(':checked')){

                $passwordField
                    .css('opacity', 0)
                    .slideDown('slow')
                    .animate(
                        { opacity: 1 },
                        { queue: false, duration: 1000 }
                    );


            } else {

                $passwordField
                    .css('opacity', 1)
                    .slideUp('slow')
                    .animate(
                        { opacity: 0 },
                        { queue: false, duration: 'slow' }
                    );
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