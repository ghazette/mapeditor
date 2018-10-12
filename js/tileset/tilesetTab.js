var Tileset = require(global.rootPath + '/js/tileset/tileset.class.js')
var my = $('window').height() / 2
var mx = $('window').width() / 2

/* functions tileset tab canvas*/

function initEnv() {
    global.workflow.tileseteditor = {
        canvas: $('#tileset-tab')[0],
        tileset: null,
        curSelection: {x2: 0, y2: 0},
        mouseDownLeft: 0,
        mouseDownRight: 0,
        mouseX: 0,
        mouseY: 0,
        mouseMove: 0,
        mouseOver: 0,
        cell: {
            size: {
                x: 8,
                y: 8
            },
            isSelected: 0
        }
    }
    global.workflow.tileseteditor.canvas.width = $(window).width() / 3
    global.workflow.tileseteditor.canvas.height = $(window).height() - 600
    global.workflow.tileseteditor.ctx = global.workflow.tileseteditor.canvas.getContext('2d')
}

function update(env)
{
    global.workflow.tileseteditor.ctx.clearRect(0, 0, global.workflow.tileseteditor.canvas.width, global.workflow.tileseteditor.canvas.height)
    if (global.workflow.tileseteditor.tileset) {
        global.workflow.tileseteditor.tileset.render(global.workflow.tileseteditor.ctx)
        drawPreSelection()
        drawSelection()
        if (global.workflow.tileseteditor.showGrid)
            drawGrid()
    }
    else
        dragPendingMessage(global.workflow.tileseteditor.ctx)
    requestAnimationFrame(() => update(env))
}

function setDrawSelectionStartPoint() {
    var rect = global.workflow.tileseteditor.canvas.getBoundingClientRect()
    global.workflow.tileseteditor.curSelection.x1 = global.workflow.tileseteditor.mouseX - rect.left
    global.workflow.tileseteditor.curSelection.x1 -= global.workflow.tileseteditor.curSelection.x1 % global.workflow.tileseteditor.cell.size.x
    global.workflow.tileseteditor.curSelection.y1 = global.workflow.tileseteditor.mouseY - rect.top
    global.workflow.tileseteditor.curSelection.y1 -= global.workflow.tileseteditor.curSelection.y1 % global.workflow.tileseteditor.cell.size.x
    global.workflow.tileseteditor.curSelection.x2 = 0
    global.workflow.tileseteditor.curSelection.y2 = 0
}

function setDrawSelectionEndPoint() {
    var rect = global.workflow.tileseteditor.canvas.getBoundingClientRect()
    global.workflow.tileseteditor.curSelection.x2 = global.workflow.tileseteditor.mouseX - rect.left - global.workflow.tileseteditor.curSelection.x1
    if (global.workflow.tileseteditor.curSelection.x2 < 0)
        global.workflow.tileseteditor.curSelection.x2 -= (global.workflow.tileseteditor.curSelection.x2 % global.workflow.tileseteditor.cell.size.x) + global.workflow.tileseteditor.cell.size.x
    else
        global.workflow.tileseteditor.curSelection.x2 -= (global.workflow.tileseteditor.curSelection.x2 % global.workflow.tileseteditor.cell.size.x) - global.workflow.tileseteditor.cell.size.x
    global.workflow.tileseteditor.curSelection.y2 = global.workflow.tileseteditor.mouseY - rect.top - global.workflow.tileseteditor.curSelection.y1
    if (global.workflow.tileseteditor.curSelection.y2 < 0)
        global.workflow.tileseteditor.curSelection.y2 -= (global.workflow.tileseteditor.curSelection.y2 % global.workflow.tileseteditor.cell.size.x) + global.workflow.tileseteditor.cell.size.x
    else
        global.workflow.tileseteditor.curSelection.y2 -= (global.workflow.tileseteditor.curSelection.y2 % global.workflow.tileseteditor.cell.size.x) - global.workflow.tileseteditor.cell.size.x
}

function dragPendingMessage(ctx) {
    ctx.font = '18px Lucida Grande, Abadi MT, Arial, Sans-Serif'
    ctx.textAlign = 'center';
    ctx.fillStyle = '#b3b3b3';
    ctx.fillText('Drag & Drop a tileset to start editing.', global.workflow.tileseteditor.canvas.width / 2, global.workflow.tileseteditor.canvas.height / 2)
}

function drawPreSelection() {
    if (global.workflow.tileseteditor.mouseMove === 1)
    {
        global.workflow.tileseteditor.cell.isSelected = 1
        setDrawSelectionEndPoint()
        global.workflow.tileseteditor.ctx.beginPath()
        global.workflow.tileseteditor.ctx.lineWidth = 1
        global.workflow.tileseteditor.ctx.rect(global.workflow.tileseteditor.curSelection.x1, global.workflow.tileseteditor.curSelection.y1, global.workflow.tileseteditor.curSelection.x2, global.workflow.tileseteditor.curSelection.y2)
        global.workflow.tileseteditor.ctx.stroke()

    }
}

function drawSelection() {
    if (global.workflow.tileseteditor.mouseDownLeft === 0 && global.workflow.tileseteditor.cell.isSelected) {
        global.workflow.tileseteditor.ctx.beginPath()
        global.workflow.tileseteditor.ctx.lineWidth = 1
        global.workflow.tileseteditor.ctx.rect(global.workflow.tileseteditor.curSelection.x1, global.workflow.tileseteditor.curSelection.y1, global.workflow.tileseteditor.curSelection.x2, global.workflow.tileseteditor.curSelection.y2)
        global.workflow.tileseteditor.ctx.stroke()
    }
}

function getMouseCanvasPosition() {
    let rect = global.workflow.tileseteditor.canvas.getBoundingClientRect()
    return { x: global.workflow.tileseteditor.mouseX - rect.left,
             y: global.workflow.tileseteditor.mouseY - rect.top}
}


function dragPendingMessage(ctx) {
    ctx.font = '18px Lucida Grande, Abadi MT, Arial, Sans-Serif'
    ctx.textAlign = 'center';
    ctx.fillStyle = '#b3b3b3';
    ctx.fillText('Drag & Drop a tileset to start editing.', global.workflow.tileseteditor.canvas.width / 2, global.workflow.tileseteditor.canvas.height / 2)
}


function drawGrid() {
    let x = global.workflow.tileseteditor.tileset.offsetX
    let y = global.workflow.tileseteditor.tileset.offsetY
    let width = global.workflow.tileseteditor.tileset.getWidth()
    let height = global.workflow.tileseteditor.tileset.getHeight()

    global.workflow.tileseteditor.ctx.beginPath()
    global.workflow.tileseteditor.ctx.lineWidth = 0.4

    //vertical
    while (x <= width + global.workflow.tileseteditor.tileset.offsetX) {
        global.workflow.tileseteditor.ctx.moveTo(x, y)
        global.workflow.tileseteditor.ctx.lineTo(x, y + height)
        x += global.workflow.tileseteditor.cell.size.x
    }
    x = global.workflow.tileseteditor.tileset.offsetX

    //horizontal
    while (y <= height + global.workflow.tileseteditor.tileset.offsetY) {
        global.workflow.tileseteditor.ctx.moveTo(x, y)
        global.workflow.tileseteditor.ctx.lineTo(x + width, y)
        y += global.workflow.tileseteditor.cell.size.y
    }
    global.workflow.tileseteditor.ctx.stroke()
}

$(document).ready(function () {
    initEnv()
    /* Event Listeners tileset tab */

    $(document).on('keydown', function (e) {
        if (global.workflow.tileseteditor.tileset && global.workflow.tileseteditor.mouseOver) {
            global.workflow.tileseteditor.cell.isSelected = 0
            switch (e.keyCode) {
                case 37:
                    global.workflow.tileseteditor.tileset.moveX(global.workflow.tileseteditor.cell.size.x)
                    break
                case 38:
                    global.workflow.tileseteditor.tileset.moveY(global.workflow.tileseteditor.cell.size.y)
                    break
                case 39:
                    global.workflow.tileseteditor.tileset.moveX(-global.workflow.tileseteditor.cell.size.x)
                    break
                case 40:
                    global.workflow.tileseteditor.tileset.moveY(-global.workflow.tileseteditor.cell.size.y)
                    break
            }
        }
    })

    global.workflow.tileseteditor.canvas.addEventListener('mouseover', () => global.workflow.tileseteditor.mouseOver = 1)

    global.workflow.tileseteditor.canvas.addEventListener('mousedown', function (e) {
        e.preventDefault()
        global.workflow.tileseteditor.mouseX = e.clientX
        global.workflow.tileseteditor.mouseY = e.clientY
        switch (e.which) {
            case 1:
                global.workflow.tileseteditor.mouseDownLeft = 1
                setDrawSelectionStartPoint()
                break
            case 3:
                global.workflow.tileseteditor.mouseDownRight = 1
                break
        }
    })

    global.workflow.tileseteditor.canvas.addEventListener('mouseup', function (e) {
        e.preventDefault()
        switch (e.which) {
            case 1:
                global.workflow.tileseteditor.mouseDownLeft = 0
                break
            case 3:
                global.workflow.tileseteditor.mouseDownRight = 0
                break
        }
        global.workflow.tileseteditor.mouseMove = 0
    })

    global.workflow.tileseteditor.canvas.addEventListener('mouseout', function (e) {
        e.preventDefault()
        global.workflow.tileseteditor.mouseDownLeft = 0
        global.workflow.tileseteditor.mouseDownRight = 0
        global.workflow.tileseteditor.mouseMove = 0
        global.workflow.tileseteditor.mouseOver = 0
    })

    global.workflow.tileseteditor.canvas.addEventListener('mousemove', function (e) {
        e.preventDefault()
        if (global.workflow.tileseteditor.mouseDownRight === 1 && global.workflow.tileseteditor.tileset) {
            global.workflow.tileseteditor.cell.isSelected = 0
            if (e.pageY < my)
                global.workflow.tileseteditor.tileset.moveY(global.workflow.tileseteditor.cell.size.y)
            if (e.pageY > my)
                global.workflow.tileseteditor.tileset.moveY(-global.workflow.tileseteditor.cell.size.y)
            if (e.pageX < mx)
                global.workflow.tileseteditor.tileset.moveX(global.workflow.tileseteditor.cell.size.x)
            if (e.pageX > mx)
                global.workflow.tileseteditor.tileset.moveX(-global.workflow.tileseteditor.cell.size.x)
            my = e.pageY
            mx = e.pageX
        }
        if (global.workflow.tileseteditor.mouseDownLeft === 1) {
            global.workflow.tileseteditor.mouseMove = 1
            global.workflow.tileseteditor.mouseX = e.clientX
            global.workflow.tileseteditor.mouseY = e.clientY
        }
        else
            global.workflow.tileseteditor.mouseMove = 0
    })

    global.workflow.tileseteditor.canvas.ondragover = function (e) {
        e.preventDefault()
        this.className = 'ondrop-tab'
    }

    global.workflow.tileseteditor.canvas.ondragleave = function (e) {
        e.preventDefault()
        this.className = ''
    }

    global.workflow.tileseteditor.canvas.ondrop = function (e) {
        e.preventDefault()
        if (e.dataTransfer.files[0].type === 'image/png')
            global.workflow.tileseteditor.tileset = new Tileset(e.dataTransfer.files[0].path, global.workflow.tileseteditor.canvas)
        this.className = ''
    }

    /* update loop */

    update(global.workflow.tileseteditor)
    requestAnimationFrame(() => update(global.workflow.tileseteditor))
})