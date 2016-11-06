console.log('Loaded!');

//madi movement
function madiMove() {
    var img = document.getElementById("madi");
    var marginLeft = 0;
    var interval = setInterval(moveRight,30);
    function moveRight(){
    	if(marginLeft == 500){
    		clearInterval(interval);
    	}
    	else{
    		marginLeft += 1;
    		img.style.marginLeft = marginLeft + "px";
        }
    }
}

//Slideshow of images
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slideimage");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}