function initScene() {
	var sceneName = $('#sceneName').val();
	var numObjs = $('#numObjs').val();

	// Set the variables in local storage so they can be 
	// accessed from different pages
	localStorage.setItem("sceneName", sceneName);
	localStorage.setItem("numObjs", numObjs);
	localStorage.setItem("objsCreated", 0);

	window.location = "../html/create_scene.html";
}