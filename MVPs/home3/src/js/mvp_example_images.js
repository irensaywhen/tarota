// ==== Show image onload to avoid flickering ====

(function () {
  const topSection = document.getElementById("top-section");
  const url = "https://picsum.photos/800/600";

  topSection.style.backgroundImage = "none";
  let image = new Image();

  //Set up background when image is loaded
  image.onload = function () {
    topSection.style.backgroundImage = "url('" + url + "')";
  };

  image.src = url;
})();
