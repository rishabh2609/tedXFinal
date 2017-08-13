/**
 * Created by Narendra on 13/8/17.
 */
var express         = require('express');
var path            = require('path');
var app             = express();
var server          = require('http').Server(app);

var bodyParser      = require('body-parser');
var session         = require('express-session');
// ======================Mysql DataBase ========================
var mysql           = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ted"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
app.use(express.static(path.join(__dirname, 'www')));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({secret: 'tom-riddle'}));

var username;

app.get('/' , function (req , res) {
	   res.sendFile(__dirname + '/www/index.html');
});
app.get('/login' , function (req , res) {
	   res.sendFile(__dirname + '/www/login.html');
});

app.post('/login' , function (req , res) {
	if(authenticate(req , res) === 0) {
		 if(login(req , res) === 0) {
		 	res.send({"result": " Not Found"});
		 }else {
		 	res.send({"result": ""+username+""});
		 }
	}else {
		res.sendFile(__dirname + '/www/admin/index.html');
	}
});



app.get('/speaker' , function (req , res) { 
	res.sendFile(__dirname + '/www/speaker.html');
});


app.post('/speaker' , function (req , res) { 
	 var sql = "SELECT * FROM speaker ";
    con.query(sql, function (err, result, fields) {
        var jsonString = JSON.stringify(result);
        var jsonData = JSON.parse(jsonString);
        res.send(jsonData);
    })

});




app.get('/blog' , function (req , res) { 
	res.sendFile(__dirname + '/www/blog.html');
});
app.post('/blog' , function (req , res) { 
	 var sql = "SELECT * FROM videos";
    con.query(sql, function (err, result, fields) {
        var jsonString = JSON.stringify(result);
        var jsonData = JSON.parse(jsonString);
        res.send(jsonData);
    })

});



function login(req,res){
    var post = req.body;
    username  = post.user;
    var password = post.password;
    console.log(username);
    var sql = "SELECT * FROM login WHERE username='" + username+"'";
    con.query(sql, function (err, result, fields) {
        var jsonString = JSON.stringify(result);
        var jsonData = JSON.parse(jsonString);
        if(jsonData[0].password === password) {
            console.log("User Identified");
            req.session.user = post.user;
            username = post.user;
            return 1;
        }else  {
            console.log("user not Identified");
            return 0;
        }
    })
}
function authenticate(req,res){
   	 console.log("authenticate called");	
    if (req.session.user) {
    	 console.log("auth find");
    	 username = req.session.user;
        return 1;
    }
    else {
    	console.log("auth not find");
        return 0;
    }
}








server.listen(3000, function(){
    console.log('listening on *:3000');
});

