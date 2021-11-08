const fs = require('fs')
const path = require('path')

const stylesFolder = path.join(__dirname, 'styles')

const bundleFolder = path.join(__dirname, 'project-dist')
const bundleFile = path.join(bundleFolder, 'bundle.css')

fs.open(bundleFile, 'w', (err) => {
  if (err) console.log(err)
})

fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err)

  const writeStream = fs.createWriteStream(bundleFile)

  files.forEach(file => {
    if (file.isFile() && path.parse(file.name).ext == '.css') {
      const styleStream = fs.createReadStream(path.join(stylesFolder, file.name), 'utf-8')

      styleStream.on('data', (chunk) => {
        writeStream.write(chunk)
      })
    }
  })
})
