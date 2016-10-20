// serverjs

// [LOAD PACKAGES]
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var session = require('express-session');
var mongoose    = require('mongoose');
var fs = require("fs");

app.set('views', __dirname + '/view'); //서버가 읽을 수 있도록 HTML 의 위치를 정의
app.set('view engine', 'ejs'); 
app.engine('html', require('ejs').renderFile); //HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정


// [ CONFIGURE mongoose ]

// CONNECT TO MONGODB SERVER
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/test');

// DEFINE MODEL
var Book = require('./models/book');

// [CONFIGURE APP TO USE bodyParser]
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));

// [CONFIGURE SERVER PORT]

var port = process.env.PORT || 3000;

// [CONFIGURE ROUTER]
var router = require('./routes')(app, Book,fs);

// [RUN SERVER]
var server = app.listen(port, function(){
 console.log("Express server has started on port " + port)
});