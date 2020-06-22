(function ($) {
  $(document).ready(function () {
    // ==== Scroll to Top ====
    $(window).scroll(function () {
      if ($(this).scrollTop() >= 100) {
        $("#return-to-top").fadeIn(200);
      } else {
        $("#return-to-top").fadeOut(200);
      }
    });

    $("#return-to-top").on("click", function () {
      $("body, html").animate(
        {
          scrollTop: 0,
        },
        500
      );
    });
  });
})(jQuery);
