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



//feedback page
var commentButton = document.getElementById('comment-button');
var commentFeedback = document.getElementById('comment-feedback').value;

commentFeedback.onclick = function () {
        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    commentFeedback = '';
                    loadFeedback();    
                } else {
                    alert('Your comment is not submitted!Please resubmit it!!');
                }
                commentButton.value = 'Submit';
          }
        };
        
        request.open('POST', '/submit-feedback', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment}));
        
    };

function loadFeedback () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var allFeedbacks = document.getElementById('allFeedbacks');
            if (request.status === 200) {
                var content = '';
                var feedbackComment = JSON.parse(this.responseText);
                for (var i=0; i< feedbackComment.length; i++) {
                    var time = new Date(feedbackComment[i].timestamp);
                    content += `
					<div class="comment">
                        <p>${escapeHTML(feedbackComment[i].comment)}</p>
                        <div class="comment-feedback">
                            ${feedbackComment[i].username} - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()} 
                        </div>
                    </div>`;
                }
                allFeedbacks.innerHTML = content;
            } else {
                allFeedbacks.innerHTML('Oops! Could not load comments!');
            }
        }
    };
    
    request.open('GET', '/get-feedback', true);
    request.send(null);
}




/*
var currentArticleTitle = window.location.pathname.split('/')[2];

function loadCommentForm () {
    var commentFormHtml = `
        <h5>Submit a comment</h5>
        <textarea id="comment_text" rows="5" cols="900" placeholder="Enter your comment here..."></textarea>
        <br/>
        <input type="submit" id="submit" value="Submit" />
        <br/>
        `;
    document.getElementById('comment_form').innerHTML = commentFormHtml;
    
    var submit = document.getElementById('submit');
    submit.onclick = function () {
        var request = new XMLHttpRequest();
        
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    document.getElementById('comment_text').value = '';
                    loadComments();    
                } else {
                    alert('Error! Could not submit comment');
                }
                submit.value = 'Submit';
          }
        };
        
        // Make the request
        var comment = document.getElementById('comment_text').value;
        request.open('POST', '/submit-comment/' + currentArticleTitle, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({comment: comment})); 
        
    };
}

function loadLogin () {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadCommentForm(this.responseText);
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function escapeHTML (text)
{
    var $text = document.createTextNode(text);
    var $div = document.createElement('div');
    $div.appendChild($text);
    return $div.innerHTML;
}

function loadComments () {
    var request = new XMLHttpRequest();
	
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var comments = document.getElementById('comments');
            if (request.status === 200) {
                var content = '';
                var commentsData = JSON.parse(this.responseText);
                for (var i=0; i< commentsData.length; i++) {
                    var time = new Date(commentsData[i].timestamp);
                    content += `<div class="comment">
                        <p>${escapeHTML(commentsData[i].comment)}</p>
                        <div class="commenter">
                            ${commentsData[i].username} - ${time.toLocaleTimeString()} on ${time.toLocaleDateString()} 
                        </div>
                    </div>`;
                }
                comments.innerHTML = content;
            } else {
                comments.innerHTML('Oops! Could not load comments!');
            }
        }
    };
    
    request.open('GET', '/get-comments/' + currentArticleTitle, true);
    request.send(null);
}


loadLogin();

loadComments(); */