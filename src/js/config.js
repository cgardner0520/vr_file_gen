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
	var objMoveModeRadio = $('input[name=obj-move-radios]:checked').val();
	if (objMoveModeRadio == 0) {		
		var objMoveMode = 0;
	} else {
		var objMoveMode = 1;
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
	var canvasX = parseFloat($('#feedbackX').val());
	var canvasY = parseFloat($('#feedbackY').val());
	var canvasZ = parseFloat($('#feedbackZ').val());

	var data = {
		subjNum: subjNum,
		subjSex: subjSex,
		dataFile: dataFile,
		initCameraPos: [initCameraX, initCameraY, initCameraZ],
		objMoveMode: objMoveMode,
		trackHeadPos: trackHeadPos,
		showFeedback: showFeedback,
		feedbackColor: feedbackColor,
		feedbackSize: feedbackSize,
		canvasPos: [canvasX, canvasY, canvasZ]
	};

	var jsonData = JSON.stringify(data, null, 4);

	// write json data to a file
	writeJsonData(jsonData);

	// point the window at the success page
	window.location = "./config_success.html";
}


function writeJsonData(jsonData) {
	var fs = require('fs');

	const remote = require('electron').remote;
	const app = remote.app;
	var path = require('path');
	var filepath = path.join(app.getPath('userData'), "config.json");

	// TODO: make this non-synchronous ?
	fs.writeFileSync(filepath, jsonData, function(err) {
		if (err) {
			console.log(err);
		}
	});
}


$(document).ready(function (){
	// add tooltips
	$('[data-toggle="tooltip"]').tooltip({
		container : 'body'
	});

	// const remote = require('electron').remote;
	// const app = remote.app;
	// alert("HEYO: " + app.getPath('userData'));
});

