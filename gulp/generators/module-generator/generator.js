/* eslint-disable no-console */
/**
 * Created by george on 4/18/17.
 */

var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var colors = require('colors');
var fs = require('fs');

function processArguments(args) {
  //Creating empty hash map
  var argsMap = {};

  //Loop which converts string input into javascript object
  for (var i = 0; i < args.length; i++) {
    //If index isn't for last element of array
    if (i + 1 != args.length) {
      //If element at index is argument NAME and next element is argument VALUE
      if (args[i].substr(0, 2) == "--" && args[i + 1].substr(0, 2) != "--") {
        //assigning VALUE to the NAME
        argsMap[args[i]] = args[i + 1];
      }
      //If element at index is argument NAME with no VALUE next to it
      else if (args[i].substr(0, 2) == "--" && args[i + 1].substr(0, 2) == "--") {
        //assigning FALSE to the NAME with no VALUE
        argsMap[args[i]] = false;
      }
    }
    //If index is for last element of array and that element is argument NAME
    else if (i + 1 == args.length && args[i].substr(0, 2) == "--") {
      //assigning FALSE to the NAME with no VALUE
      argsMap[args[i]] = false;
    }
    //If index is for last element of array and that element is argument VALUE
    else if (i + 1 == args.length && args[i].substr(0, 2) != "--") {
      //Empty condition not to get inside 'else' block
    }
    //If there is some kind of error
    else {
      console.log("=======ERROR=======");
    }
  }

  return argsMap;
}

function validateArgs(argsMap) {
  //Defining path value
  var path = argsMap["--path"];
  var errorSuffix = "The path is relative to src/app folder";

  //Checking if there is '--path' argument in hashmap
  if (argsMap.hasOwnProperty("--path") != false) {
    //Checking if value of it isn't false
    if (path != false) {
      //Checking whether it start with "/" or not
      if (path.indexOf("/") == 0) {
        //Cutting "/" from path not to get double slashes
        argsMap["--path"] = path.toString().substr(1);
        return true;
      } else {
        return true;
      }
    }
    //If no value is defined for --path
    else {
      console.log(("--path argument requires full path (including module name). " + errorSuffix).red);
      return false;
    }
  }
  //If no --path argument is defined
  else {
    console.log(("Please specify --path argument with full path (including module name). " + errorSuffix).red);
    return false;
  }
}

function generateModule(params) {
  var fileSuffix = {
    'module.txt': ".module.js",
    'controller.txt': ".controller.js",
    'html.txt': ".html",
    'less.txt': ".less"
  };

  for (var s in fileSuffix) {

    //Creating stream
    var stream = gulp.src('gulp/generators/module-generator/template/' + s);

    //Replacing all matching strings with custom strings
    for (var i in params) {
      stream.pipe(replace("{{" + i + "}}", params[i]));
    }

    var filePath = 'src/app/' + params.ModulePath + '/' + params.FolderName + fileSuffix[s];
    if (fs.existsSync(filePath)) {
      console.log(("[Skipping] ".yellow + filePath).yellow);
      continue;
    }
    //Saving
    stream.pipe(rename(params.FolderName + fileSuffix[s]))
      .pipe(gulp.dest('src/app/' + params.ModulePath + '/'));

    console.log("[Creating] ".green + filePath);
  }
}

gulp.task('generate-module', function () {
  //Removing unnecessary elements from 'argv' array and copying others to 'args' array
  var args = process.argv.splice(3);

  var argsMap = processArguments(args);

  //If validation succeeds assign values to variables.
  if (validateArgs(argsMap) == true) {
    var params = {};
    params['ModulePath'] = argsMap["--path"];
    params['ModuleDisplayName'] = params.ModulePath.split("/").pop().ucFirst().replace(/[-_.](\w)?/g, function ($0, $1) {
      return " " + $1.toUpperCase();
    });
    params['ModuleName'] = params['ModuleDisplayName'].replace(/\s+/g, "").lcFirst();
    params['ControllerName'] = params['ModuleName'].ucFirst() + "Controller";
    params['FolderName'] = params.ModulePath.split("/").pop();

    // console.log(params);

    generateModule(params);
  }
});

String.prototype.ucFirst = function () {
  return this.valueOf()[0].toUpperCase() + this.valueOf().substring(1);
};
String.prototype.lcFirst = function () {
  return this.valueOf()[0].toLowerCase() + this.valueOf().substring(1);
};
