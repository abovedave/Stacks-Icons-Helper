const path = require('path')
const fs = require('fs')

// Path to Stacks Icons, included by npm
const stacksIconPath = path.join(__dirname, 'node_modules/@stackoverflow/stacks-icons/build/lib')

// Empty object for list of icons
let iconsObj = {}

// Read the folder of icons
fs.readdir(stacksIconPath, (err, icons) => {
    if (err) throw err

    // We only want SVGs
    icons = icons.filter(i => path.extname(i).toLowerCase() === '.svg')

    // Loop over each file
    icons.forEach(icon => {
        // Name without extension
        let name = path.basename(icon, '.svg')

        // Grab the actual SVG code from the file
        let code = fs.readFileSync(path.resolve(stacksIconPath, icon), 'utf8')

        // Write to array
        iconsObj[name] = code
    })

    // Number of icons
    let iconsCount = Object.keys(iconsObj).length

    // If we have an object of icons
    if (iconsCount) {
        // This is what we'll print in our front end JS
        let jsDefinition = 'var stacksIcons = ' + JSON.stringify(iconsObj)

        // Location of front-end JS
        let jsFile = path.join(__dirname, 'index.js')

        // Read/write
        fs.readFile(jsFile, 'utf8', (err, data) => {
            if (err) throw err

            // Replace the object in the js file
            var result = data.replace(/\/\/ Start icons(.|[\r\n])*\/\/ End icons/gm, "// Start icons\n" + jsDefinition + "\n// End icons")

            // Write it back
            fs.writeFile(jsFile, result, 'utf8', err => {
                if (err) throw err
                console.log('Successfuly built with ' + iconsCount + ' icons')
            })
        })
    }
})