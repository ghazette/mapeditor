var newProject = require(global.rootPath + '/js/newproject/newProjectRenderer.js')

$(document).on("click", ".fileMenu>button", function(){
	switch($(this).attr("id"))
	{
		case "newProject":
			newProjectButton();
			break;
		case "importProject":
			importProjectButton();
			break;
		case "exportProject":
			exportProjectButton();
			break;
		case "exportMap":
			exportMapButton();
			break;
	}
});

function newProjectButton()
{
	newProject();
}

function importProjectButton()
{
	console.log("importProject");
}

function exportProjectButton()
{
	console.log("exportProject");
}

function exportMapButton()
{
	console.log("exportMap");
}



