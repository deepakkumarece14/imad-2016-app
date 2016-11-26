
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


//deepakkumarece14 
