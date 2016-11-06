console.log('Loaded!');

//madi movement
var img = document.getElementById("madi");
var marginLeft = 0;
function moveRight(){
	/*if(marginLeft >= 1150){
		clearInterval(interval);
	}
	else{*/
		marginLeft += 1;
		img.style.marginLeft = marginLeft + "px";

}

img.onclick = function() {
	var interval = setInterval(moveRight,30);
};


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