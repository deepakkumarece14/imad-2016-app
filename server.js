var express = require('express');
var morgan = require('morgan');
var path = require('path');
var crypto = require('crypto');
var Pool = require('pg').Pool;
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(session({
	secret:'YouKnowitsaSecret',
	cookie: {maxAge: 1000*60*60*24*30}
}));

var config = {
    user: 'deepakkumarece14',
    database: 'deepakkumarece14',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var pool = new Pool(config);

var articles = {
    'article-one': {
        title: 'Article HTML',
        heading: 'Article HTML',
        date: '24th Sep. 2016',
        content: ` 
    		<p>HTML stands for HyperTextMarkupLanguage.</p>
    		<div class="info"><p><b>info</b> goes here</p></div>`},
    'article-two': {
        title: 'Article CSS',
        heading: 'Article CSS',
        date: '26th Sep. 2016',
        content: ` 
    		<p>CSS stands for Cascading Style Sheet.</p>
    		<div class="info"><p><b>info</b> goes here</p></div>`},
    'article-three': {
        title: 'Article JAVASCRIPT',
        heading: 'Article JAVASCRIPT',
        date: '28th Sep. 2016',
        content: ` 
    		<p>JA stands for Javascript.</p>
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
        <header>
    	    <div class="menubar-container">
        		<img src="/ui/madilogo.png" alt="madilogo"/>
        		<nav>
        			<ul class="menubar">
        				<li class="menu-item"><a href="/ui/home">HOME</a></li>
        				<li class="menu-item"><a href="/ui/profile">PROFILE</a></li>
        				<li class="menu-item"><a href="/ui/articles">ARTICLES</a></li>
        				<li class="menu-item"><a href="/ui/userlogin" target="_blank">LOGIN</a></li>
        				<li class="menu-item"><a href="/ui/feedback" target="_blank">FEEDBACK</a></li>
        			</ul>
        		</nav>
    	    </div>	<!--end of menubar_container-->
        </header>
        
        <div class="body_container">
        	<p></p>
        	<h2>${heading}</h2>
        	<div class="date">${date.toDateString}</div>
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

app.get('/ui/home', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/profile', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
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

app.get('/ui/feedback', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'feedback.html'));
});

app.get('/ui/madi.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/madilogo.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'madilogo.png'));
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

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'login.html'));
});

function hash(input,salt) {
	var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
	return ['pbkdf2', '10000', salt, hashed.toString('hex')].join('$');
}
app.get('/hash/:input', function (req, res) {
	var hashedString = hash (req.params.input,'this-is-a-salt');
    res.send(hashedString);
});

app.get('/test-db', function (req, res) {
	pool.query('SELECT * FROM users_db', function (err,result) {
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result));
        }
    });
});

app.get('/create-user', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
		
    var salt = crypto.getRandomBytes(128).toString('hex');
    var hashedPassword = hash(password,salt);
    pool.query('INSERT INTO users_db (username, password) VALUES ($1, $2)', [username, hashedPassword], function (err,result) {
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send('You are successfully signed up! with' + username);
        }
    });
});


app.post('/login', function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
		
    var salt = crypto.getRandomBytes(128).toString('hex');
    var hashedPassword = hash(password,salt);
    pool.query('SELECT * FROM users_db WHERE username=$1', [username], function (err,result) {
        if(err){
            res.status(500).send(err.toString());
        }else if(result.rows.length == 0){
			res.status(500).send("Username or Password is incorrect!");
        else {
			var hashedPassword = result.rows[0].password;
			var hashedPassword.split('$')[2];
			var hashedCompared = hash(password,salt);
			if(hashedCompared == hashedPassword) {
				//session
			req.session.auth = {userId: result.rows[0]}.id};
				
				res.send('You are successfully Loggedin! with' + username);
			}else{
				res.send(403).send("Username or Password is incorrect!")
			}
		}
    });
});

app.get('/check-login',function(req,res) {
	if(req.session && req.session.auth && req.session.auth.userId) {
		res.send('You are logged in!' + req.session.auth.userId.toString());
	}else {
		res.send('You are not logged in! Please login again!!');
	}
});

app.get('/logout',function(req,res) {
	delete req.session.auth;
	res.send('You are logged out');
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
