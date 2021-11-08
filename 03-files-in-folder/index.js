const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, 'secret-folder')

fs.readdir(root,
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err)
    else {
      files.forEach(file => {
        if (file.isFile()) {
          const fileRoot = path.join(__dirname, 'secret-folder', file.name)

          fs.stat(fileRoot, function (err, stat) {
            if (err)
              console.log(err)
            else
              console.log(`${path.parse(file.name).name} - ${path.parse(file.name).ext.slice(1)} - ${stat.size}b`)
          })
        }
      })
    }
  })