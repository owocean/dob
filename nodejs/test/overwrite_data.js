var dob = require("../");

/*

Dob before:

--- BEGIN POST ---
#! John Doe
#! 1993
--- END POST ---

--- BEGIN POST ---
#! Jack Stauber
#! 1986
--- END POST ---

--- BEGIN POST ---
#! John Kramer
#! 1975
--- END POST ---

*/

var database = dob("./test.dob");

database.stack("Updated data",["John Kramer","1965"]);
// Stack a new post with a different year

/*

Dob after:

--- BEGIN POST ---
#! John Kramer
#! 1965
Updated data
--- END POST ---

--- BEGIN POST ---
#! John Doe
#! 1993
--- END POST ---

--- BEGIN POST ---
#! Jack Stauber
#! 1986
--- END POST ---

--- BEGIN POST ---
#! John Kramer
#! 1975
--- END POST ---

*/

var parsed = database.parse()
for(var i = 0; i<parsed.length; i++){
    var post = parsed[i];
    if(post.data[0]=="John Kramer"){
        console.log("Found latest entry for John Kramer, born in year "+post.data[1]);
        break;
    }
}