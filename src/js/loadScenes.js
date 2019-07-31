// global variables
var sceneList;	// list of scenes chosen for the experiment
var sceneCounter;	// used to assign IDs to selected scenes; keeps counting up even if a scene is unselected

// load the scene database
var scenes = require('../js/db.js');

function chooseScene(sceneNum) {
	var selectedScenes = $('#selectedScenes');
	scenes.find({sceneNum: sceneNum}, function(err, docs) {
		for (i = 0; i < docs.length; i++) {
			// selectedScenes.append('<li class="list-group-item" style="background-color: #333; color: white;">' + docs[i].sceneName + '</li>');
			selectedScenes.append('<button type="button" class="list-group-item" id="sceneBtn' + sceneCounter + '" style="background-color: #333; color: white;" onclick="removeScene(' + sceneCounter + ', \'' + docs[i].sceneName + '\')">' + docs[i].sceneName + '</li>');
			sceneCounter++;

			sceneList = JSON.parse(localStorage.getItem("sceneList"));
			sceneList.push(JSON.stringify(docs[i]));
			localStorage.setItem("sceneList", JSON.stringify(sceneList));
		}
	});	
}

function loadScenes() {
	sceneCounter = 0;

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

function removeScene(idNum, sceneName) {
	// get rid of the scene from the UI
	var sceneId = '#sceneBtn' + idNum.toString();
	$(sceneId).remove();

	// remove the scene from the internal scene list
	for (i = sceneList.length - 1; i >= 0; i--) {
		var curScene = JSON.parse(sceneList[i]);
		if (curScene.sceneName === sceneName) {
			sceneList.splice(i, 1);
			localStorage.setItem("sceneList", JSON.stringify(sceneList));
			break;
		}
	}
}

// this function implements the Durstenfeld shuffle (a computer-optimized version of the Fisher-Yates algorithm).
// For more information about the randomness of the Fisher-Yates algorithm, see: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffleOrder() {
	for (let i = sceneList.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[sceneList[i], sceneList[j]] = [sceneList[j], sceneList[i]];
	}
}

function randomizeScenes() {
	// reorder the selected scenes
	shuffleOrder();

	// remove the old scene list from the display
	var selectedScenes = $('#selectedScenes');
	selectedScenes.empty();

	// add the scenes in the new order
	for (i = 0; i < sceneList.length; i++) {
		curScene = JSON.parse(sceneList[i]);
		selectedScenes.append('<button type="button" class="list-group-item" id="sceneBtn' + sceneCounter + '" style="background-color: #333; color: white;" onclick="removeScene(' + sceneCounter + ', \'' + curScene.sceneName + '\')">' + curScene.sceneName + '</li>');
		sceneCounter++;
	}
	localStorage.setItem("sceneList", JSON.stringify(sceneList));
}

function sceneListToString() {
	var sceneListStr = "";
	for (i = 0; i < sceneList.length; i++) {
		sceneListStr += JSON.parse(sceneList[i]).sceneName + "\n";
	}
	return sceneListStr;
}

function createInputFile() {
	// format the trials properly
	var trials = []

	// need this if statement to prevent undefined errors
	if (sceneList) {
		for (i = 0; i < sceneList.length; i++) {
			var curScene = JSON.parse(sceneList[i]);
			var trial = {
				trialNum: (i + 1),
				objects: curScene.objects
			}
			trials.push(trial);
		}
	}
	
	var input = {
		trials: trials
	};

	var jsonInput = JSON.stringify(input, null, 4);

	// file handling
	var fs = require('fs');
	const remote = require('electron').remote;
	const app = remote.app;		// we need a reference to the app to find its path
	var path = require('path');
	// var filename = "test.json";
	

	var filename = $('#inputFileName').val();
	if (filename.length < 1) {
		filename = 'input_file.json';
	} else {
		filename = filename + '.json';
	}

	var filepath = path.join(app.getPath('home'), filename);
	
	fs.writeFileSync(filepath, jsonInput, function(err) {
		if (err) {
			console.log(err);
			alert(`ERROR: Could not save ${filename} to ${filepath}`);
		}
	});
	alert("Success! File saved to " + filepath);
	localStorage.setItem("inputFilepath", filepath);
	window.location = "./input_file_success.html"
}

$(document).ready(function() {
	// Add tooltips
	$('[data-toggle="tooltip"]').tooltip({
		container: 'body'
	});
});