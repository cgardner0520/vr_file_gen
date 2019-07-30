// Import the database
var scenes = require('../js/db.js');

function initScene() {
	var sceneName = $('#sceneName').val();
	var numObjs = $('#numObjs').val();

	// Set the variables in local storage so they can be 
	// accessed from different pages
	localStorage.setItem("sceneName", sceneName);
	localStorage.setItem("numObjs", numObjs);
	localStorage.setItem("objsCreated", 0);
	localStorage.setItem("objects", "[]");

	// var numScenes = localStorage.getItem("numScenes");
	// if (!numScenes) {
	// 	localStorage.setItem("numScenes", 0);
	// }

	scenes.count({}, function(err, num) {
		localStorage.setItem("numScenes", num);
	})

	// set the current scene number based on the number of docs in the db

	window.location = "../html/create_scene.html";
}

$(document).ready(function() {
	// Add tooltips
	$('[data-toggle="tooltip"]').tooltip({
		container: 'body'
	});
});