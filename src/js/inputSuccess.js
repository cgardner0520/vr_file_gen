function displaySuccessMsg() {
	var filepath = localStorage.getItem('inputFilepath');
	var successMsgDiv = $('#successMsg');
	var msg = 'You can find your new input file here:';
	successMsgDiv.append('<p>' + msg + '</p><p>' + filepath + '</p>');
}