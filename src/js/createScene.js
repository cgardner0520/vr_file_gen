// Global Variables
var objsCreated;
var sceneName;
var numObjs;
var objs;

// Import the database
var scenes = require('../js/db.js');

function getGlobalVars() {
	objsCreated = parseInt(localStorage.getItem("objsCreated"));
	sceneName = localStorage.getItem("sceneName");
	numObjs = parseInt(localStorage.getItem("numObjs"));
	objects = JSON.parse(localStorage.getItem("objects"));
	alert("HERE");
	alert("OBJECTS:\n" + objects);
}


// This function is called once for every object that
// needs to be part of the scene. It displays the 
// form used to determine the parameters for the object.
function addObj() {
	// objNum
	var objNum = objsCreated + 1;

	// objType
	var objType = $('#objType').val();

	// objScale
	var objScaleX = parseFloat($('#objScaleX').val());
	var objScaleY = parseFloat($('#objScaleY').val());
	var objScaleZ = parseFloat($('#objScaleZ').val());

	// startPos
	var objStartX = parseFloat($('#objStartX').val());
	var objStartY = parseFloat($('#objStartY').val());
	var objStartZ = parseFloat($('#objStartZ').val());

	// endPos
	var objEndX = parseFloat($('#objEndX').val());
	var objEndY = parseFloat($('#objEndY').val());
	var objEndZ = parseFloat($('#objEndZ').val());

	// velocity
	var velocity = parseFloat($('#velocity').val());

	// timeVisible
	var timeVisible = parseFloat($('#timeVisible').val());	

	// rotationSpeed
	var rotationSpeed = parseFloat($('#rotation').val());

	var newObj = {
		objNum: objNum,
		objType: objType,
		objScale: [objScaleX, objScaleY, objScaleZ],
		startPos: [objStartX, objStartY, objStartZ],
		endPos: [objEndX, objEndY, objEndZ],
		velocity: velocity,
		timeVisible: timeVisible,
		rotationSpeed: rotationSpeed
	};

	objsCreated += 1;
	objects.push(newObj);
	alert("NEW OBJECTS:\n" + objects);
	localStorage.setItem("objects", JSON.stringify(objects));
	localStorage.setItem("objsCreated", objsCreated.toString());

	// Save the scene once all objects have been added
	if (objsCreated == numObjs) {
		alert("All objects created");

		var newScene = {
			sceneName: sceneName,
			objects: objects
		};

		alert('objs:\n' + newScene['objects']);

		scenes.insert(newScene, function(err, doc) {
			console.log('Inserted', doc.name, 'with ID', doc._id);
		});
		alert("Inserted doc in database?");
		scenes.find({}, function(err, docs) {
			temp = "";
			for (i = 0; i < docs.length; i++) {
				temp += JSON.parse(docs[i].objects);
				temp += " ";
			}
			alert("END OF DOCS:\n" + temp);
		});
		window.location = "./index.html"
	} else {
		alert('here ?');
		alert("objsCreated: " + objsCreated + "\nnumObjs: " + numObjs);
		window.location = "./create_scene.html";
	}
}


$(document).ready(function() {
	getGlobalVars();
	var objCreationHeader = $('#objCreationHeader');
	objCreationHeader.append('<h2>Object ' + (objsCreated + 1) + ' </h2>');
})