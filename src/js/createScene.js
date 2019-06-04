// Global Variables
var objsCreated;
var sceneName;
var numObjs;
var objs;


function getGlobalVars() {
	objsCreated = parseInt(localStorage.getItem("objsCreated"));
	sceneName = localStorage.getItem("sceneName");
	numObjs = parseInt(localStorage.getItem("numObjs"));
	objects = JSON.parse(localStorage.getItem("objects"));
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
	localStorage.setItem("objects", JSON.stringify(objects));
	localStorage.setItem("objsCreated", objsCreated.toString());

	// Save the scene once all objects have been added
	if (objsCreated == numObjs) {
		alert("All objects created");
	} else {
		window.location = "./create_scene.html";
	}
}


$(document).ready(function() {
	getGlobalVars();
	var objCreationHeader = $('#objCreationHeader');
	objCreationHeader.append('<h2>Object ' + (objsCreated + 1) + ' </h2>');
})