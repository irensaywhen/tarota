(function ($) {
  $(document).ready(function () {
    // Caching
    $formFirstStep = $("#cta_form_first-step");
    $formSecondStep = $("#cta_form_second-step");

    // Switch to the second step of the form
    $("#cta_order-button").click(function (event) {
      event.preventDefault();

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
    $("#cta_form").validate();
  });
})(jQuery);
