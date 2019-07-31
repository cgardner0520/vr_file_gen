function createConfig() {
	// subjNum
	var subjNum = parseInt($('#subjNum').val());

	// subjSex
	var subjSexRadio = $('input[name=subj-sex-radios]:checked').val();
	if (subjSexRadio == 'female-radio') {
		var subjSex = 1;
	} else {
		var subjSex = 0;
	}

	// dataFile
	var dataFile = $('#dataFile').val() + '.json';

	// initCameraPos
	var initCameraX = parseFloat($('#camX').val());
	var initCameraY = parseFloat($('#camY').val());
	var initCameraZ = parseFloat($('#camZ').val());

	// objMoveMode
	var objMoveMode = 1;
	// var objMoveModeRadio = $('input[name=obj-move-radios]:checked').val();
	// if (objMoveModeRadio == 0) {
	// 	var objMoveMode = 0;
	// } else {
	// 	var objMoveMode = 1;
	// }

	// offsetObj
	var offsetObjRadio = $('input[name=offset-obj-radios]:checked').val();
	if (offsetObjRadio == 'offset-obj-true') {
		var offsetObj = true;
	} else {
		var offsetObj = false;
	}

	// trackHeadPos
	var trackHeadPosRadio = $('input[name=head-pos-radios]:checked').val();
	if (trackHeadPosRadio == 'yes-head-pos-radio') {
		var trackHeadPos = true;
	} else {
		var trackHeadPos = false;
	}

	// showFeedback
	var showFeedbackRadio = $('input[name=show-feedback-radios]:checked').val();
	if (showFeedbackRadio == 'yes-feedback-radio') {
		var showFeedback = true;
	} else {
		var showFeedback = false;
	}

	// feedbackColor
	var feedbackColor = $('#feedbackColor').val().toLowerCase();

	// feedbackSize
	var feedbackSize = parseFloat($('#feedbackSize').val());

	// canvasPos
	var canvasPosX = parseFloat($('#feedbackX').val());
	var canvasPosY = parseFloat($('#feedbackY').val());
	var canvasPosZ = parseFloat($('#feedbackZ').val());

	// Create a dictionary to hold the config data
	var data = {
		subjNum: subjNum,
		subjSex: subjSex,
		dataFile: dataFile,
		initCameraPos: [initCameraX, initCameraY, initCameraZ],
		objMoveMode: objMoveMode,
		offsetObj: offsetObj,
		trackHeadPos: trackHeadPos,
		showFeedback: showFeedback,
		feedbackColor: feedbackColor,
		feedbackSize: feedbackSize,
		canvasPos: [canvasPosX, canvasPosY, canvasPosZ]
	};

	// Convert the data to JSON
	var jsonData = JSON.stringify(data, null, 4);

	// Write the JSON data to a file
	writeJsonData(jsonData);

	// Point the window to a success page
	// window.location = "../html/config_success.html"
}


function writeJsonData(jsonData) {
	// Require the file system library functions
	var fs = require('fs');

	// Get a remote reference to the application to find the filepath
	const remote = require('electron').remote;
	const app = remote.app;
	var path = require('path');

	// Save the file as "config.json" in the application's user data folder 
	var filepath = path.join(app.getPath('home'), "config.json");

	fs.writeFileSync(filepath, jsonData, function(err) {
		if (err) {
			console.log(err);
			alert(`ERROR: Could not save config.json file to ${filepath}`);
		}
	})
}

$(document).ready(function() {
	// Add tooltips
	$('[data-toggle="tooltip"]').tooltip({
		container: 'body'
	});
});