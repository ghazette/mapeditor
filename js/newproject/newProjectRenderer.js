const { ipcRenderer } = require('electron')
var Project = require(global.rootPath + '/js/project.class.js')
var em = require(global.rootPath + '/js/eventEmitter.js')

function newProject() {
    let options = {
        title: "New Project",
        width: 480,
        height: 235,
        file: global.rootPath + '/html/newProject.html'
    }
    var result = ipcRenderer.sendSync("newDialog", options)
    if (result !== null) {
        global.project = new Project(result)
        em.emit('projectCreated')
    }
}

module.exports = newProject