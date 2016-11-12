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
    document.getElementById("madibtn").disabled = true;
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

//counter
var counter = document.getElementById("counter");
var counter_btn = document.getElementById("counter-click");
counter_btn.onclick = function() {
    var request =new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if(request.readyState == XMLHttpRequest.DONE) {
            if(request.status == 200) {
                var count = request.responseText;
                
                var counter = document.getElementById("counter");
                counter.innerHTML = count.toString();
            }
        }
    };
    
    //making the request
    request.open('GET','https://cloud.imad.hasura.io/counter',true);
    request.send(null);  
};



