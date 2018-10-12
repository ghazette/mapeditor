$(document).ready(function () {
	window.addEventListener("resize", function (e) {
	
		global.workflow.mapeditor.canvas.width = $(window).width() / 1.5 - 10
		global.workflow.mapeditor.canvas.height = $(window).height() - 150

		global.workflow.tileseteditor.canvas.width = $(window).width() / 3
		global.workflow.tileseteditor.canvas.height = $(window).height() - 600
	
		$("#tileset-tab-info").width(global.workflow.tileseteditor.canvas.width)
	})
})