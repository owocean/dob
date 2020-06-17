var dob = require("../");

// Is it possible to store a dob within a dob?
// (Yes, it is)

var testdob = 
    "--- BEGIN POST ---"     + "\n" +
    "&B;"                    + "\n" +
    "Sample Text"            + "\n" +
    "&E;"                    + "\n" +
    "--- END POST ---"

console.log(testdob)

console.log("\n")

// "&B;" and "&E;" are the placeholders for --- BEGIN POST --- and --- END POST ---

var post = dob.parse(testdob)[0];

post.text = post.text
    .replace(/&B;/g, "--- BEGIN POST ---")
    .replace(/&E;/g, "--- END POST ---");

console.log(post.text);