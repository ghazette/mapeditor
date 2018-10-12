const { ipcRenderer } = require('electron')
const { dialog } = require('electron').remote;
window.$ = window.jQuery = require('jquery')
var mask = require('jquery-mask-plugin')
var done = 0

$("#cellWidth").mask('000')
$("#cellHeight").mask('000')
$("#mapWidth").mask('0000')
$("#mapHeight").mask('0000')
$("#projectName").mask('ZZZZZZZZZZZZZZZZ', {
	translation: {
		'Z' : {
			pattern: /[\w-\.]/,
			optional: true
		}
	}
})

function initProject() {
	let project = {
		name: $("#projectName").val(),
		folder: $("#folder").val(),
		map : {
			width: parseInt($("#mapWidth").val(), 10),
			height: parseInt($("#mapHeight").val(), 10)
		},
		cell : {
			width: parseInt($("#cellWidth").val(), 10),
			height: parseInt($("#cellHeight").val(), 10)
		}
	}
	if ((project.name.length >= 1 && project.name.length <= 16) &&
		(project.map.width >= 1 && project.map.height >= 1) &&
		(project.cell.width >= 8 && project.cell.height >= 8) &&
		project.folder.length >= 1) {
			project.folder +=  "/" + project.name
			ipcRenderer.sendSync('closeDialog', project)
		}
}
$(document).on('keydown', function (e) {
	if (e.keyCode === 13)
		initProject()
})

$("#create").on('click', () => initProject())

$("#cancel").on('click', function (e) {
	e.preventDefault()
	ipcRenderer.sendSync('closeDialog')
})

$("#folder").on('click', (e) => {
	e.preventDefault()
	if (done === 0) {
		done = 1
		dialog.showOpenDialog({
			properties: ['openDirectory', 'showHiddenFiles'],
			title: "Choose a destination folder"
		}, function (path) {
			$("#folder").val(path)
			done = 0
		})
	}
})