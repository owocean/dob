"use strict"

const fs = require('fs');

function dob(path){
    if(path==undefined||typeof path != "string")throw "No path specified";
    var ex = {
      "append": function(input,info){
        if(input==undefined)throw "No input specified";
        if(info==undefined){
          info = [];
        };
          var data = fs.readFileSync(path);
          var infodata = "";
          for (var i = 0; i<info.length; i++){
            infodata+="#! "+info[i]+"\n";
          }
          fs.writeFileSync(path, data+"--- BEGIN POST ---\n"+infodata+input+"\n--- END POST ---\n\n");
      },
      "stack": function(input,info){
        if(input==undefined)throw "No input specified";
        if(info==undefined){
          info = [];
        };
          var data = fs.readFileSync(path);
          var infodata = "";
          for (var i = 0; i<info.length; i++){
            infodata+="#! "+info[i]+"\n";
          }
          fs.writeFileSync(path, "--- BEGIN POST ---\n"+infodata+input+"\n--- END POST ---\n\n"+data);
      },
      "raw": function(){return fs.readFileSync(path).toString()},
      "parse":  function(){
        return parsedob(this.raw());
      }
    }
    return ex;
  }

  function parsedob(dob){
    if(typeof dob != "string")throw "Expected String";
    var lines = dob.split("\n");
    var output = [];
    var temp = [];
    var tempdata = [];
    var isPost = false;
    lines.forEach(function(line){
      if(line.startsWith("--- BEGIN POST ---")){
        isPost = true;
      }else if(line.startsWith("#!")){
        if(!isPost)return;
        var d = line.split("#! ").slice(1).join("#! ");
        tempdata.push(d);
      }else if(line.startsWith("--- END POST ---")){
        isPost=false;
        var d = {
          "text":temp.join("\n"),
          "data":tempdata
        }
        output.push(d);
        temp = [];
        tempdata = [];
      }else{
        if(!isPost)return;
        temp.push(line);
      }
    });
    return output;
  }

  function dobify(array){
    var dob = "";
    if(!Array.isArray(array))throw "Expected Array";
    for(var i = 0; i<array.length; i++){
      var post = array[i];
      if(post.text == undefined)throw "Expected Values";
      if(post.text == null || typeof post.text == "object"){
        post.text = "";
      }
      dob += "--- BEGIN POST ---\n";
      if(post.data != undefined && Array.isArray(post.data)){
        post.data.forEach(function(data){
          dob += "#! " + data + "\n";
        })
      }
      dob += post.text + "\n--- END POST ---\n\n";
    }
    return dob;
  }

  module.exports = dob;
  module.exports.parse = parsedob;
  module.exports.dobify = dobify;