// global variables
var sceneList;	// list of scenes chosen for the experiment

// load the scene database
var scenes = require('../js/db.js');

function chooseScene(sceneNum) {


	// alert("sceneNum is " + sceneNum);

	var selectedScenes = $('#selectedScenes');

	// TODO: change find filter to be based on scene number 
	scenes.find({}, function(err, docs) {
		for (i = 0; i < docs.length; i++) {
			if (i === sceneNum) {
				selectedScenes.append('<p>' + docs[sceneNum].sceneName + '<p>');
				
				// add the scene to the global scene list
				sceneList = JSON.parse(localStorage.getItem("sceneList"));
				sceneList.push(JSON.stringify(docs[sceneNum]));
				localStorage.setItem("sceneList", JSON.stringify(sceneList));
			}
		}
	});
	
}

function loadScenes() {
	scenes.find({}, function(err, docs) {
		// create a button for all existing scenes
		for (i = 0; i < docs.length; i++) {
			// alert(docs[i].sceneName);
			var existingScenes = $('#existingScenes');
			// existingScenes.append('<h2>Scene ' + (i + 1) + ': ' + docs[i].sceneName + '</h2>');
		
			// existingScenes.append('<p><button name="scene' + docs[i].sceneName + '" class="btn btn-secondary" type="button" onclick="chooseScene(' + i + ')">' + docs[i].sceneName + '</button></p>');

			existingScenes.append('<p><button name="scene' + docs[i].sceneName + '" class="btn btn-secondary" type="button" onclick="chooseScene(' + i + ')">' + docs[i].sceneName + '</button></p>');

		}		
	});

	// create/store the initial empty scene list
	var initSceneList = [];
	localStorage.setItem("sceneList", JSON.stringify(initSceneList));
}

function showScenes() {
	var chosenScenes = localStorage.getItem("sceneList");
	alert("CHOSEN SCENES");
	alert(chosenScenes);
}

function randomizeSceneOrder() {
	// shuffle function ?
	// also need to reset display when we randomize (rip)
}