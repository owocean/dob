var dob = require("../");
var database = dob("./messages.dob");

function newMessage(message, author){
    var timestamp = new Date().toString();
    database.append(message, [author, timestamp]);
}

// Its that simple

// Call the function whenever a message is sent or whatever
newMessage("Hello World!", "owocean");
newMessage("Hey there!", "Gabriel");