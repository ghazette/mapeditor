$("#showGrid").on('click', function () {
  global.workflow.tileseteditor.showGrid = (global.workflow.tileseteditor.showGrid) ? 0 : 1
  if (global.workflow.tileseteditor.showGrid)
    $(this).addClass("active")
  else
    $(this).removeClass("active")
})

$("#modifyTileSize").on('click', function () {
  global.workflow.tileseteditor.cell.isSelected = 0
  global.workflow.tileseteditor.cell.size.x += 8
  global.workflow.tileseteditor.cell.size.y += 8
  if (global.workflow.tileseteditor.cell.size.x + global.workflow.tileseteditor.cell.size.y > 128) {
    global.workflow.tileseteditor.cell.size.x = 8
    global.workflow.tileseteditor.cell.size.y = 8
  }
})