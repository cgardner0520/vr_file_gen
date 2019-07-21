// global variables
var sceneList;	// list of scenes chosen for the experiment

// load the scene database
var scenes = require('../js/db.js');

function chooseScene(sceneNum) {



	var selectedScenes = $('#selectedScenes');
	scenes.find({sceneNum: sceneNum}, function(err, docs) {
		for (i = 0; i < docs.length; i++) {
			selectedScenes.append('<li class="list-group-item" style="background-color: #333; color: white;">' + docs[i].sceneName + '</li>');
			sceneList = JSON.parse(localStorage.getItem("sceneList"));
			sceneList.push(JSON.stringify(docs[i]));
			localStorage.setItem("sceneList", JSON.stringify(sceneList));
		}
	});

	// TODO: change find filter to be based on scene number 
	// scenes.find({}, function(err, docs) {
	// 	for (i = 0; i < docs.length; i++) {
	// 		if (i === sceneNum) {
	// 			// selectedScenes.append('<p>' + docs[sceneNum].sceneName + '<p>');
	// 			selectedScenes.append('<li class="list-group-item" style="background-color: #333; color: white;">' + docs[sceneNum].sceneName + '</li>');

	// 			// <li class="list-group-item" style="background-color: #333; color: white;">Thing?</li>
				
	// 			// add the scene to the global scene list
				// sceneList = JSON.parse(localStorage.getItem("sceneList"));
				// sceneList.push(JSON.stringify(docs[sceneNum]));
				// localStorage.setItem("sceneList", JSON.stringify(sceneList));
	// 		}
	// 	}
	// });

	// scenes.find({sceneNum: sceneNum.toString()}).exec(function(err, docs) {
	// 	selectedScenes.append('<li class="list-group-item" style="background-color: #333; color: white;">' + docs[sceneNum].sceneName + '</li>');
	// 	sceneList = JSON.parse(localStorage.getItem("sceneList"));
	// 	sceneList.push(JSON.stringify(docs[sceneNum]));
	// 	localStorage.setItem("sceneList", JSON.stringify(sceneList));
	// });
	
}

function loadScenes() {
	// scenes.find({}, function(err, docs) {
	// 	// create a button for all existing scenes
	// 	for (i = 0; i < docs.length; i++) {
	// 	// for (i = (docs.length - 1); i >= 0; i--) {
	// 		// alert(docs[i].sceneName);
	// 		// var existingScenes = $('#existingScenes');
	// 		// existingScenes.append('<p><button name="scene' + docs[i].sceneName + '" class="btn btn-secondary" type="button" onclick="chooseScene(' + i + ')">' + docs[i].sceneName + '</button></p>');

	// 		var availableScenes = $('#availableScenes');
	// 		availableScenes.append('<button type="button" class="list-group-item list-group-item-action btn-select" style="background-color: #333; color: white;" onclick="chooseScene(' + i + ')">' + docs[i].sceneName + '</button>');

	// 	}		
	// });



	var availableScenes = $('#availableScenes');

	scenes.find({}).sort({sceneNum: 1}).exec(function(err, docs) {
		for (i = 0; i < docs.length; i++) {
			availableScenes.append('<button type="button" class="list-group-item list-group-item-action btn-select" style="background-color: #333; color: white;" onclick="chooseScene(' + docs[i].sceneNum + ')">' + docs[i].sceneName + '</button>');
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