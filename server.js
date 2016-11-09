var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var pool = require('pg').pool;
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(morgan('combined'));

var config = {
    user: 'deepakkumarece14',
    database: 'deepakkumarece14',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var pool = new pool(config);

var articles = {
    'article-one': {
        title: 'Article HTML',
        heading: 'Article HTML',
        date: '24th Sep. 2016',
        content: ` 
    		<p>HTML stands for Cascading Style Sheet.</p>
    		<div class="info"><p><b>info</b> goes here</p></div>`},
    'article-css': {
        title: 'Article CSS',
        heading: 'Article CSS',
        date: '24th Sep. 2016',
        content: ` 
    		<p>CSS stands for Cascading Style Sheet.</p>
    		<div class="info"><p><b>info</b> goes here</p></div>`},
    'article-js': {
        title: 'Article JAVASCRIPT',
        heading: 'Article JAVASCRIPT',
        date: '24th Sep. 2016',
        content: ` 
    		<p>CSS stands for Cascading Style Sheet.</p>
    		<div class="info"><p><b>info</b> goes here</p></div>`}
};

function createTemplate(data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmlTemplate = `
        <!DOCTYPE html>
        <html>
            <head>
                <title>${title}</title>
                <link rel="icon" href="/ui/madi.png" />
                <link rel="stylesheet" href="/ui/style.css" />
            </head>
        <body>
        <div class="menubar_container">
        	<ul class="menubar_left" style="width:100%;overflow:hidden;height:50px">
        		<li class="menu_left"><a href="#menu"><img src="/ui/menu-3.png"/></a></li>
        		<li class="menu_left"><a href="/ui/home_page.html">HOME</a></li>
        		<li class="menu_left"><a href="/ui/profile.html">PROFILE</a></li>
        		<li class="menu_left"><a href="/ui/articles.html">ARTICLES</a></li>
        		
        		<li><input class="search_box menubar_right menu_right" type="text" name="search_box" placeholder="Search" height="45px"></li>
        		<li class="menubar_right menu_right"><img src="/ui/searchicon.png"/></li>
        		<li class="menubar_right menu_right"><a href="/ui/user_login.html" target="_blank" title="Login">
        		    <img src="/ui/users.png"/></a></li>
        		<li class="menu_right"><a href="/ui/feedback.html" target="_blank" title="Feedback">FEEDBACK</a></li>
        	</ul>
        </div> <!--end of menubar_container-->
        
        <div class="body_container">
        	<p></p>
        	<h2>${heading}</h2>
        	<div class="date">${date}</div>
        	<div class="content">
        		${content}
        	</div>
        </div>  <!--body_container ends here -->
        
        <script lang="javascript" src="/ui/main.js"></script>
        </body>
        </html>`;
    return htmlTemplate;
}


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

var count = 0;
app.get('/counter', function (req, res) {
    count = count + 1;
    res.send(count.toString());
});

app.get('/ui/madi.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/home_page.html', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'home_page.html'));
});

app.get('/ui/feedback.html', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'feedback.html'));
});

app.get('/ui/madi.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/background.JPG', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'background.JPG'));
});

app.get('/ui/profile.JPG', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'profile.JPG'));
});

app.get('/ui/menu-3.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'menu-3.png'));
});

app.get('/ui/searchicon.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'searchicon.png'));
});

app.get('/ui/users.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'users.png'));
});

function hash(input,salt) {
	var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
	return hashed.toString('hex');
}
app.get('/hash/:input', function (req, res) {
	var hashedString = hash (req.params.input,'this-is-a-salt');
    res.send(hashedString);
});

app.get('/create-user', function (req, res) {
    var salt = crypto.getRandomBytes(128).toString('hex');
    var hashedPassword = hash(password,salt);
    pool.query('INSERT INTO users_db (username, password) VALUES ($1, $2)', [username, hashedPassword], funtion (err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send("You are successfully signed up!");
        }
    });
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
