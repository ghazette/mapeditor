var em = require(global.rootPath + '/js/eventEmitter.js')

/* configure canvas */

global.workflow.mapeditor.canvas = $("#mapeditor")[0]
global.workflow.mapeditor.ctx = global.workflow.mapeditor.canvas.getContext("2d")
global.workflow.mapeditor.canvas.width = $(window).width() / 1.5 - 10
global.workflow.mapeditor.canvas.height = $(window).height() - 150


function initEnv() {
    global.workflow.mapeditor.grid = {
        x: 0,
        y: 0,
        cell: {
            width: global.project.settings.cell.width,
            height: global.project.settings.cell.height
        },
        map: {
            width: global.project.settings.cell.width * global.project.settings.map.width,
            height: global.project.settings.cell.height * global.project.settings.map.height
        }
    }
    global.workflow.mapeditor.zoom = 1
}



function drawGrid() {
    let x = global.workflow.mapeditor.grid.x
    let y = global.workflow.mapeditor.grid.y

    global.workflow.mapeditor.ctx.beginPath()
    global.workflow.mapeditor.ctx.lineWidth = 1

    //vertical
    while (x <= global.workflow.mapeditor.grid.map.width + global.workflow.mapeditor.grid.x) {
        
        global.workflow.mapeditor.ctx.moveTo(x, y)
        global.workflow.mapeditor.ctx.lineTo(x, y + global.workflow.mapeditor.grid.map.height)
        x += global.workflow.mapeditor.grid.cell.width
    }
    x = global.workflow.mapeditor.grid.x

    //horizontal
    while (y <= global.workflow.mapeditor.grid.map.height + global.workflow.mapeditor.grid.y) {
        global.workflow.mapeditor.ctx.moveTo(x, y)
        global.workflow.mapeditor.ctx.lineTo(x + global.workflow.mapeditor.grid.map.width, y)
        y += global.workflow.mapeditor.grid.cell.height
    }
    global.workflow.mapeditor.ctx.stroke()
}

$(document).ready(function () {
    /*
        TODO
        -pouvoir dessiner tile par tile
        -deplacer la map
        -zoom/dezoom
    */

   em.on('projectCreated', function () {
        console.log("Initializing map editor...")
        initEnv()
        drawGrid()
   });

})