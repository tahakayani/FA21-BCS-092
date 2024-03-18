var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(function() {
    slides[slideIndex - 1].classList.add("fade");
  }, 200); 
  setTimeout(function() {
    slides[slideIndex - 1].style.display = "none";
    slides[slideIndex - 1].classList.remove("fade");
    showSlides();
  }, 4000); 
}
