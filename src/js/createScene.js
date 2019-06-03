// Global Variables
var objsCreated;
var sceneName;
var numObjs;


function getGlobalVars() {
	objsCreated = parseInt(localStorage.getItem("objsCreated"));
	sceneName = localStorage.getItem("sceneName");
	numObjs = parseInt(localStorage.getItem("numObjs"));
}


// function testThis() {
// 	getGlobalVars();
// 	alert("The scene name is " + sceneName + " and there are " + numObjs + " objects");
// }


// This function is called once for every object that
// needs to be part of the scene. It displays the 
// form used to determine the parameters for the object.
// function addObj() {

// }


$(document).ready(function() {
	getGlobalVars();
	var objCreationHeader = $('#objCreationHeader');
	objCreationHeader.append('<h2>Object ' + (objsCreated + 1) + ' </h2>');
})