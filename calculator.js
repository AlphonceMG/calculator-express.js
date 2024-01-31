var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
    var num1 = Number(req.body.n1);
    var num2 = Number(req.body.n2);
    var operation = req.body.operation;

    var result;
    switch (operation) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            if (num2 == 0) {
                result = "Cannot divide by zero";
            } else {
                result = num1 / num2;
            }
            break;
        default:
            result = "Invalid operation";
    }

    // Send result as JSON to the client
    res.render("result", { result: result });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});