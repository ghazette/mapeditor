var fs = require('fs')

class Project {
    constructor(settings) {
        if (typeof settings === "object") {
            this.settings = settings
            this.addDate("creation")
            this.addLayer()
            this.createRootFolder()
            this.create()
        }
        else if (typeof settings === "string") {
           //open project
        }
        else
            console.log("wrong settings")
    }

    create() {
        fs.writeFileSync(this.settings.folder + "/" + this.settings.name + '.json', JSON.stringify(this.settings, null, 4), { encoding: 'utf8', flag: 'w+' })
    }

    addDate(type) {
        let date = new Date()
        date = date.toLocaleTimeString() + ", " + date.toLocaleDateString()
        if (type === "update")
            this.settings.lastUpdate = date
        if (type === "creation")
            this.settings.creation = date
    }

    createRootFolder() {
        if (!fs.existsSync(this.settings.folder))
            fs.mkdirSync(this.settings.folder)
    }

    addLayer() {
        if (typeof this.settings.layer !== undefined)
            this.settings.layer = [ {} ]
        else
            this.settings.layer.push({})
    }
}

module.exports = Project