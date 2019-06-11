var express = require("express");
var app = express();
var path = require("path");
const bodyParser = require('body-parser');
// configure body-parser to read JSON
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/1955');

var UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
}, {
    timestamps: true
});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');
mongoose.Promise = global.Promise;

app.get('/', function(req, res){
User.find({}, function(err, users){
        if(err){
           console.log("Returned error", err);
            // respond with JSON
           res.json({message: "Error", error: err})
        }
        else {
            // respond with JSON
           res.json({message: "Success", data: users})
        }
     })
})
app.get('/new/:name', function(req,res){
    var user = new User();
    user.name = req.params.name;
    user.save(function(err){
        if(err){
            console.log("something went wrong", err);
        } else {
            console.log("successfully updated")
            User.find({}, function(err, users){
                        if(err){
                           console.log("Returned error", err);
                            // respond with JSON
                           res.json({message: "Error", error: err})
                        }
                        else {
                            // respond with JSON
                           res.json({message: "Success", data: users})
                        }
                     })
        }
    })
})
app.get('/remove/:name', function(req,res){
    User.findOne({name: req.params.name}, function(err, user){
        user.remove(function(err){
            if(err){
                console.log("something went wrong", err);
            } else {
                console.log("successfully deleted")
            }
            res.redirect('/')
        })
    })
})

app.get("/:name", function(req,res){
    User.findOne({name: req.params.name}, function(err, user){
        if(err){
                console.log("something went wrong", err);
            } else {
                console.log("successfully deleted")
            }
            res.json({message: "Success", data: user})
    })
})

app.listen(8000, function () {
    console.log("listening on port 8000");
})