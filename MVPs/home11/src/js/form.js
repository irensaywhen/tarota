(function ($) {
  document.addEventListener("DOMContentLoaded", function () {
    // Caching
    $formFirstStep = $("#cta_form_first-step");
    $formSecondStep = $("#cta_form_second-step");
    $timeInput = $formFirstStep.find("#time");
    $price = $(".cta_form_price");
    $form = $("#cta_form");

    // Function to set the price based on the selected time
    function setPrice() {
      // Get the price of the currently selected option
      let price = $timeInput.find(":selected")[0].dataset.price;

      // Set the price
      $price.text(price);
    }

    // Set the default price for the selected time
    setPrice();

    // Switch to the second step of the form
    $("#cta_order-button").click(function (event) {
      event.preventDefault();

      if (validator.form()) {
        $formFirstStep.fadeOut(400, function () {
          // Hide the first step
          $formFirstStep.hide();

          //Animate appearance of the second step
          $formSecondStep
            .css({
              display: "block",
              opacity: "0",
            })
            .fadeTo(400, 1);
        });
      }
    });

    // Switching to the first step of the form
    $("#cta_form_back").click(function (event) {
      event.preventDefault();

      $formSecondStep.fadeOut(400, function () {
        // Hide the second step
        $formSecondStep.hide();

        //Animate appearance of the first step
        $formFirstStep
          .css({
            display: "block",
            opacity: "0",
          })
          .fadeTo(400, 1);
      });
    });

    // Validate the form
    const validator = $form.validate();

    // Submit the hidden form when the form is submitted
    $form.submit(function (event) {
      // Do not submit the current form
      event.preventDefault();

      if ($(this).valid()) {
        // Submit the hidden form instead
        $("#hidden-form").submit();
      }
    });

    // Set up price based on the selected time
    $timeInput.change(setPrice);
  });
})(jQuery);
