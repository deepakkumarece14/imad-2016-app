var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/home_page.html', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'home_page.html'));
});

app.get('/ui/madi.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


app.get('/ui/background.jpeg', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'background.jpeg'));
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


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
