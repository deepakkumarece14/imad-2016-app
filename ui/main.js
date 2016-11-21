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

//toast
function toast() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 4000);
}

//counter
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
    request.open('GET','http://deepakkumarece14.imad.hasura-app.io/counter',true);
    request.send(null);
};

//login
var loginButton = document.getElementById("login-btn");
loginButton.onclick = function() {
    var request =new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if(request.readyState == XMLHttpRequest.DONE) {
            if(request.status == 200) {
				alert("Logged in successfully!");				
            }else if (request.status == 403){
				alert("Username or Password is incorrect!!");	
			}else if (request.status == 500) {
				alert("Something went wrong on the server!");
			}
        }
    };
    
    //making the request
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	console.log(username);
    console.log(password);	
    request.open('POST','/login',true);
    //request.open('POST','/userlogin',true);
    request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify({username: username, password: password}));
};

//signup
var signupButton = document.getElementById("signup-btn");
signupButton.onclick = function() {
    var request =new XMLHttpRequest();
    
    request.onreadystatechange = function() {
        if(request.readyState == XMLHttpRequest.DONE) {
            if(request.status == 200) {
				alert("Signed up successfully!");				
            }else {
				alert("Please signup again!");	
			}
        }
    };
    
    //making the request
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	console.log(username);
    console.log(password);	
    request.open('POST','/usersignup',true);
    request.setRequestHeader('Content-Type', 'application/json');
	request.send(JSON.stringify({username: username, password: password}));
};

