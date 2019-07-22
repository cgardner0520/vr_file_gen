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
	var sceneId = '#sceneBtn' + idNum.toString();
	$(sceneId).remove();

	// for (i = 0; i < sceneList.length; i++) {
	// 	alert("i: " + i + "\n" + sceneList[i]);
	// }
	alert('there are ' + sceneList.length + ' scenes');
	for (i = sceneList.length - 1; i >= 0; i--) {
		var curScene = JSON.parse(sceneList[i]);
		if (curScene.sceneName === sceneName) {
			sceneList.splice(i, 1);
			alert('removt');
			break;
		}
	}
	alert('and now there are ' + sceneList.length + ' scenes');
	for (i = 0; i < sceneList.length; i++) {
		alert(JSON.parse(sceneList[i]).sceneName);
	}
}

function randomizeSceneOrder() {
	// shuffle function ?
	// also need to reset display when we randomize (rip)
}